import React from 'react'
import Button from './components/Common/Button'
import { Scale } from './Scale'

/**
 * Ok, this file is a huge mess. I'll clean it up later. Pinky-promise 🤙
 */

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

const connectScale = async () => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [
      {
        services: ['00001820-0000-1000-8000-00805f9b34fb']
      }
    ]
  })

  const server = await device.gatt!.connect()
  /*;(async function reconnect() {
    if (!device.gatt!.connected) await device.gatt!.connect()
    await sleep(100)
    reconnect()
  })()*/

  console.log(await server.getPrimaryServices())
  const service = await server.getPrimaryService(
    '00001820-0000-1000-8000-00805f9b34fb'
  )
  console.log(await service.getCharacteristics())

  const characteristic = await service.getCharacteristic(
    '00002a80-0000-1000-8000-00805f9b34fb'
  )

  //const c1 = await characteristic.startNotifications()
  //await characteristic.startNotifications()

  return characteristic

  /*c1.addEventListener('characteristicvaluechanged', (e: any) => {
    try {
      console.log(new Uint8Array(e.target.value.buffer))
      const msg = packet.decode((e.target.value.buffer as any) as ArrayBuffer)
      console.log(msg)
    } catch (e) {}
  })

  let i = 0
  const poll = () => {
    packet.setSequenceId(i++)
    characteristic.writeValue(packet.encodeWeight())
  }
  //const sendTare = () => c1.writeValue(encode(0, [0x04]))
  //setInterval(sendHeartbeat, 3000)
  setInterval(poll, 1000)

  //setTimeout(() => sendTare(), 1000)
  //console.log(await characteristic.readValue())

  console.log(characteristic)*/
}

type ScaleConnectProps = {
  onScaleConnected: (scale: Scale) => void
}

export default ({ onScaleConnected }: ScaleConnectProps) => {
  const connect = async () => {
    const device = await connectScale()
    const scale: Scale = {
      onWeightChange: () => {},
      startListeningChanges: async () => {
        await device.startNotifications()

        device.addEventListener(
          'characteristicvaluechanged',
          bindOnWeightChange(weight => scale.onWeightChange(weight))
        )
        setInterval(() => device.writeValue(force_handshake()), 3000)
        setInterval(() => device.writeValue(heartbeat()), 3000)

        await sleep(4000)
        await device.writeValue(defEvent())
      }
    }
    onScaleConnected(scale)
  }

  return <Button onClick={connect}>Connect scale</Button>
}

const bindOnWeightChange = (onWeigthChange: (weight: number) => void) => (
  e: any
) => {
  try {
    const unsigned8Arr = (e.target.value as DataView)!

    let length = unsigned8Arr.byteLength
    let s = 1
    while (length > 0 && s !== unsigned8Arr.byteLength) {
      const s2 = unsigned8Arr.getUint8(s)
      if (s2 === 5) {
        // WEIGHT
        const weight =
          new Uint32Array(unsigned8Arr.buffer.slice(s + 1, s + 5))[0] / 100
        console.log(weight)
        onWeigthChange(weight)
        /*
      [5, 168, 112, 0, 0, 2, 0] // 288.4
      [5, 0, 0, 0, 0, 2, 0] // 0
      [5, 161, 180, 0, 0, 2, 0] // 462.4
      */

        s += 6
        length -= 6
      } else if (s2 === 6) {
        // Battery
        length--
        s++
      } else if (s2 === 7) {
        // Timer
        s += 3
        length -= 3
      } else if (s2 === 8) {
        // Key
        s++
        length--
      } else if (11) {
        s += 2
        length -= 2
      }

      s++
      length--
    }
  } catch (e) {
    console.error(e)
  }
}

const checksum = (data: number[], initial: number) => {
  let sum1 = initial
  let sum2 = initial
  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      sum1 = sum1 + data[i]
    } else {
      sum2 = sum2 + data[i]
    }
  }
  return [sum1 % 255, sum2 % 255]
}

const HEADER = [239, 221]

const pack = (action: number, data: number[], initial = -1) => {
  const result = new Uint8Array(data.length + 5)

  result[0] = HEADER[0]
  result[1] = HEADER[1]
  result[2] = action

  for (let i = 0; i < data.length; i++) {
    result[i + 3] = data[i]
  }

  const [cs1, cs2] = checksum(data, initial)
  result[data.length + 3] = cs1
  result[data.length + 4] = cs2

  return result
}

const packEvent = (arr: Uint8Array, s: number, s2: number, s3: number) => {
  arr[s] = s2
  const s4 = s + 1
  const s5 = [1, 1, 1, 0, 0, 6, 1, 3, 1, 2, 3, 2][s2]
  if (s5 == 1) {
    arr[s4] = s3
  }
  return s5 + 1
}

const defEvent = () => {
  const ls = new Uint8Array(9)
  const event1 = packEvent(ls, 1, 0, 1) + 1
  const event2 = event1 + packEvent(ls, event1, 1, 2)
  const event3 = event2 + packEvent(ls, event2, 2, 5)
  const event4 = event3 + packEvent(ls, event3, 3, 0)
  const event5 = event4 + packEvent(ls, event4, 4, 0)
  ls[0] = event5

  //console.log([...pack(12, [...ls], 0)].map(e => e.toString(16)))
  return pack(12, [...ls], 0)
}

const heartbeat = () => {
  const data = [0x02, 0x00]
  const action = 0
  return pack(action, data)
}

const getWeight = () => {
  const data = [1]
  const action = 0
  return pack(action, data)
}

const getScaleStatus = () => {
  const data: number[] = []
  const action = 6
  return pack(action, data)
}

const force_handshake = () => {
  const data = '012345678901234'.split('').map(c => c.charCodeAt(0))
  const action = 11
  return pack(action, data)
}
/*


function encode(type: number, payload: number[]) {
  let cksum1 = 0
  let cksum2 = 0
  const bytes = new Uint16Array(payload.length + 5)
  bytes[0] = 0xef
  bytes[1] = 0xdd
  bytes[2] = type

  for (let i = 0; i < payload.length; i++) {
    bytes[i + 3] = payload[i]
    if (i % 2 === 0) {
      cksum1 = (cksum1 + payload[i]) & 0xff
    } else {
      cksum2 = (cksum2 + payload[i]) & 0xff
    }
  }

  bytes[payload.length + 3] = cksum1
  bytes[payload.length + 4] = cksum2

  return bytes
}

const WEIGHT_COMMAND = 4

const encrypt = (command: number, action: number, data: number[], result: Uint8Array) => {

  const next = 1;
  result[0] = 223;
  result[1] = 120;
  result[2] = (data.length + 5);
  result[3] = command;
  result[4] = next;
  result[5] = action;
  result[6] = data.length;
  if (data.length != 0) {
      str_encrypt(data, result, data.length, next, 7);
      for (let i = 0; i < data.length; i++) {
        result[i + 7] = s_table[(bArr[i4] + i2) & 255]);
      }
  }
  result[data.length + 7] = get_sum(result, data.length + 4, 3));
  result[data.length + 8] = 0;
}

const getWeight = (result: Uint8Array, period: number, time: number, type: number) => {
  const data = [period, time, type]
  return encrypt(WEIGHT_COMMAND, 0, data, result);
}


class wt_req {
  private buffer: Uint8Array = new Uint8Array(3)
  private period: number = 0
  private time: number = 0
  private type: number = 0

  public void setData(i: number, int i2, int i3) {
      this.period = i;
      this.time = i2;
      this.type = i3;
  }

  public Unsigned8[] getByteArray() {
      this.buffer[0].set(this.period.get());
      this.buffer[1].set(this.time.get());
      this.buffer[2].set(this.type.get());
      return this.buffer;
  }

  public ByteOrder byteOrder() {
      return ByteOrder.LITTLE_ENDIAN;
  }
}*/

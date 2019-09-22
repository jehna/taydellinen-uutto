import React, { useCallback } from 'react'
import * as packet from 'btscale/lib/packet'

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

export default () => {
  const connect = useCallback(async () => {
    const scale = await connectScale()

    await scale.startNotifications()

    /*scale.addEventListener('characteristicvaluechanged', (e: any) =>
      console.log(e.target.value)
    )*/

    /*setInterval(async () => {
      await scale.writeValue(heartbeat())
      console.log(scale.value!)
    }, 1000)*/

    setInterval(() => scale.writeValue(force_handshake()), 1000)
    setInterval(() => scale.writeValue(heartbeat()), 1000)
    await scale.writeValue(getScaleStatus())
    console.log(scale.value)

    /*await scale.writeValue(packet.encodeGetBattery())
    console.log(await scale.readValue())*/
  }, [])
  return (
    <div>
      <button onClick={connect}>Connect scale</button>
    </div>
  )
}

const checksum = (data: number[]) => {
  let sum1 = -1
  let sum2 = -1
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

const pack = (action: number, data: number[]) => {
  const result = new Uint8Array(data.length + 5)

  result[0] = HEADER[0]
  result[1] = HEADER[1]
  result[2] = action

  for (let i = 0; i < data.length; i++) {
    result[i + 3] = data[i]
  }

  const [cs1, cs2] = checksum(data)
  result[data.length + 3] = cs1
  result[data.length + 4] = cs2

  return result
}

const heartbeat = () => {
  const data = [0x02, 0x00]
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

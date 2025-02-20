import { Injectable } from "@nestjs/common";

@Injectable()
export class DevicesService {
  constructor() {}

  create() {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": Date.now(),
    }
  }

  readOne() {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": Date.now(),
    }
  }

  readAll() {
    return [{
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": Date.now(),
    },{
      "id": "120002",
      "name": "Device Name 2",
      "brand": "Samsung",
      "state": "available",
      "created_at": Date.now(),
    },{
      "id": "120003",
      "name": "Device Name 3",
      "brand": "HTC",
      "state": "available",
      "created_at": Date.now(),
    },{
      "id": "120004",
      "name": "Device Name 4",
      "brand": "Huawei",
      "state": "available",
      "created_at": Date.now(),
    }]
  }

  update() {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": Date.now(),
    }
  }

  updatePartial() {
    return {
      "id": "120001",
      "name": "Device Name 1",
      "brand": "Motorola",
      "state": "available",
      "created_at": Date.now(),
    }
  }

  delete() {
    return true;
  }
}

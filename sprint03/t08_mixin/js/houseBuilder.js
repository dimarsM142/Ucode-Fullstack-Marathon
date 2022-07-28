function HouseBlueprint(address, description, owner, size)  {
    this.address = address;
    this.date = new Date();
    this.description = description;
    this.owner = owner;
    this.size = size;
    this._averageBuildSpeed = 0.5;
    this.getDaysToBuild = () => { return this.size / this._averageBuildSpeed; }
}
function HouseBuilder(address, description, owner, size, roomCount) {
    let houseBlueprint = new HouseBlueprint();
    Object.getPrototypeOf(houseBlueprint).constructor.call(this, address, description, owner, size);
    this.roomCount = roomCount;
}
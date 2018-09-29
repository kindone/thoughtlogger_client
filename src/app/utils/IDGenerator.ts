export class IDGenerator {
    public static counter: number = 1

    public static generate() {
        return (this.counter++).toString()
    }
}

export class Converter {
    public static toBase64(array: number[] | Uint8Array) {
        return btoa(String.fromCharCode(...new Uint8Array(array)))
    }
}
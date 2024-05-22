export default function parseObject(json: string) {
    try {
        return JSON.parse(json)
    } catch {
        return ""
    }
}
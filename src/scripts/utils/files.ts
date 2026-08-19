export default class Files {
    static selectImage(): Promise<File | null> {
        return new Promise((resolve) => {
            const input = document.createElement("input")

            input.type = "file"
            input.accept = "image/*"

            input.onchange = () => {
                const file = input.files?.[0] ?? null
                resolve(file)
            }

            input.click()
        })
    }

    static async uploadImage(
        file: File,
        endpoint: string
    ): Promise<{ url: string }> {
        const formData = new FormData()
        formData.append("image", file)

        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error(`Image upload failed: ${response.status}`)
        }

        return response.json()
    }
}
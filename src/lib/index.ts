
const readLine = async() => {
    const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
    return input.trim()
}
export function printLine (text: string, breakLine: boolean = true) {
        process.stdout.write(text + (breakLine ? '\n' : ''))
    }
    
export async function promptInput(text:string)  {
        printLine(`\n${text}\n`, false)
        return readLine()
}

export async function promptSelect<T extends string>(text:string, values: readonly T[]) : Promise<T> {
    printLine(`\n${text}`)
    values.forEach((value) => {
        printLine(`- ${value}`)
    })
    printLine('>', false)

    const input = (await readLine()) as T
    if(values.includes(input)){
        return input;
    }else{
        return promptSelect<T>(text, values);
    }
}
import { printLine, promptInput } from './lib/index';

// const printLine = (text: string, breakLine: boolean = true) => {
//     process.stdout.write(text + (breakLine ? '\n' : ''))
// }

// const promptInput = async (text:string) => {
//     printLine(`\n${text}\n`, false)
//     const input: string = await new Promise((resolve) => process.stdin.once('data', (data) => resolve(data.toString())))
//     return input.trim()
// }
export class HitAndBlow {
    private readonly answerSource = ['0','1','2','3','4','5','6','7','8','9']
    private answer: string[] = []
    private tryCount = 0

    setting(){
        const answerLength = 3;
        while(this.answer.length < answerLength){
            const randNum = Math.floor(Math.random()*this.answerSource.length)
            const selectedItem = this.answerSource[randNum];
            if(!this.answer.includes(selectedItem)){
                this.answer.push(selectedItem);
            }
        }
    }
    async play(){
        const inputArr = (await promptInput("「,」区切りで」3つの数字を入力してください")).split(',')
        const result = this.check(inputArr)
        if(result.hit !== this.answer.length){
            printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}`, true)
            this.tryCount++;
            await this.play();
        }else{
            this.tryCount++;
        }
    }
    end(){
        printLine(`正解です!!\n試行回数: ${this.tryCount}`)
        process.exit(0)
    }
    check(input: string[]){
        let hitCount = 0;
        let blowCount = 0;

        input.forEach((val, index) => {
            if(val === this.answer[index]){
                hitCount++;
            }else if(this.answer.includes(val)){
                blowCount++;
            }
        })

        return {
            hit: hitCount,
            blow: blowCount
        }
    }
}

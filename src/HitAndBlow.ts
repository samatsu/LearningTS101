import { stripVTControlCharacters } from 'util';
import { printLine, promptInput, promptSelect } from './lib/index';

const modes = ['normal','hard'] as const 
type Mode = typeof modes[number]

export class HitAndBlow {
    private readonly answerSource = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    private answer: string[] = []
    private tryCount = 0
    private mode: Mode = modes[0]

    constructor() {
    }
    async setting() {
        this.mode = await promptSelect("モードを入力してください", modes)

        const answerLength = this.getAnswerLength();
        while (this.answer.length < answerLength) {
            const randNum = Math.floor(Math.random() * this.answerSource.length)
            const selectedItem = this.answerSource[randNum];
            if (!this.answer.includes(selectedItem)) {
                this.answer.push(selectedItem);
            }
        }
    }
    private getAnswerLength() {
        switch (this.mode) {
            case 'normal':
                return 3;
            case 'hard':
                return 4;
            default:
                throw new Error(`${this.mode}は無効なモードです。`)
        }
    }
    async play() {        
        const answerLength = this.getAnswerLength();
        let valResult = false;
        let inputArr: string[];
        do {
            inputArr = (await promptInput(`「,」区切りで${answerLength}つの数字を入力してください`)).split(',')
            valResult = this.validate(inputArr);
            if (!valResult) {
                printLine('無効な入力です')
            }
        } while (!valResult);
        const result = this.check(inputArr)
        if (result.hit !== this.answer.length) {
            printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}`, true)
            this.tryCount++;
            await this.play();
        } else {
            this.tryCount++;
        }
    }
    end() {
        printLine(`正解です!!\n試行回数: ${this.tryCount}`)
        process.exit(0)
    }
    private validate(inputArr: string[]) {
        const isLengthValid = inputArr.length === this.answer.length
        const isAllAnswerSourceOption = inputArr.every((val) => this.answerSource.includes(val))
        const isAllDifferenceValues = inputArr.every((val, i) => inputArr.indexOf(val) === i)
        return isLengthValid && isAllAnswerSourceOption && isAllDifferenceValues
    }
    check(input: string[]) {
        let hitCount = 0;
        let blowCount = 0;

        input.forEach((val, index) => {
            if (val === this.answer[index]) {
                hitCount++;
            } else if (this.answer.includes(val)) {
                blowCount++;
            }
        })

        return {
            hit: hitCount,
            blow: blowCount
        }
    }
}


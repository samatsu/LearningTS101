
import { HitAndBlow } from './HitAndBlow';



(async () => {
    const hitAndBlow =  new HitAndBlow();
    hitAndBlow.setting();
    await hitAndBlow.play();
    hitAndBlow.end();
})()


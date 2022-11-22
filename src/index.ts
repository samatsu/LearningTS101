
import { HitAndBlow } from './HitAndBlow';



(async () => {
    const hitAndBlow =  new HitAndBlow();
    await hitAndBlow.setting();
    await hitAndBlow.play();
    hitAndBlow.end();
})()


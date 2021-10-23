import StepBlock from "./StepBlock";
import TransportControls from './TransportControls'
import {useEffect} from "react";
import {useState} from "react";
import * as Tone from "tone";

const blockTimes = [3,3,4,2,5];



const Metronome = () => {



    //let vol = new Tone.Volume(-12);
    //instrument.chain(vol, Tone.Master);

    const osc = new Tone.Player("./cr78/Rim_Orig_CR78.wav").toDestination();
    const osc2 = new Tone.Player("./cr78/OH_1_Orig_CR78.wav").toDestination();
    const osc3 = new Tone.Player("./cr78/Cowb_Orig_CR78.wav").toDestination();


    let currentStep = 0;
    let currentSubStep = 0;


    

    const Step = (time) => {

        if (currentStep > blockTimes.length - 1) {
            currentStep = 0;
            currentSubStep = 0
            console.log('reset')
            osc3.start(time).stop(time + 0.1);
            return
        }

        if (currentSubStep > blockTimes[currentStep]) {
            currentSubStep = 0
            currentStep += 1;
            osc2.start(time).stop(time + 0.1);
            console.log(`step ${currentStep}`)
        } else {
            currentSubStep += 1;
            osc.start(time).stop(time + 0.1);
        }


    }




    // repeated event every 8th note
    Tone.Transport.scheduleRepeat((time) => {
        // use the callback time to schedule events

        Step(time)
    }, "16n");

    // transport must be started before it starts invoking events


    return(<>
        <h1>Metronome</h1>
            <StepBlock blockTimes = {[...blockTimes]} />
            <TransportControls tone={Tone}/>
            {}
        </>
    )

}

export default Metronome
import * as Tone from "tone";

class StepEngine {
    constructor(data) {

        // Data
        this.data = data;

        // Step Counters
        this.currentStep = 0;
        this.currentLargeStep = 0;
        this.currentSubStep = 0;
        this.useReset = true;

        // Tone Players
        this.vol = new Tone.Volume().toDestination();
        this.osc = new Tone.Player("./samples/BD CR78 MPC60 05.wav").connect(this.vol);
        this.osc2 = new Tone.Player("./samples/Clave CR78 MPC60 10.wav").connect(this.vol);
        this.osc3 = new Tone.Player("./samples/CLICKHIGH.wav").connect(this.vol);

    }

    /**
     * Is called on each step and provides the counting and playback
     * @param time
     */
    step(time) {

        console.log(this.data)

        if(!this.data[this.currentStep].silent) {
            if(this.currentStep === 0 && this.currentLargeStep === 0 && this.currentSubStep === 0 && this.useReset === true) this.osc3.start(time).stop(time + 0.2);
            else if (this.currentLargeStep === 0 && this.currentSubStep === 0) this.osc.start(time).stop(time + 0.2);
            else if (this.currentSubStep === 0) this.osc2.start(time).stop(time + 0.2);
        }

        // Increment the step counters!
        if(this.currentSubStep < this.data[this.currentStep].base - 1) {
            this.currentSubStep += 1;
        } else {
            this.currentSubStep = 0;
            this.currentLargeStep += 1;
            if (this.currentLargeStep >= this.data[this.currentStep].length) {
                this.currentLargeStep = 0;
                if(this.currentStep >= this.data.length - 1) {
                    this.currentStep = 0
                } else {
                    this.currentStep += 1;
                }
                //setActiveStep(currentStep)
            }
        }

    }

    /**
     * Updates the sound
     * @param main
     * @param alt
     * @param reset
     */
    changeSound = (main, alt, reset) => {
        this.osc.load(`./${main}`)
        this.osc2.load(`./${alt}`)
        this.osc3.load(`./${reset}`)
    }

    updateData = (newData) => this.data = newData;
    muteAltSound = (muted) => this.osc2.mute = muted;
    toggleResetSound = () => this.useReset = !this.useReset;
}

export default StepEngine
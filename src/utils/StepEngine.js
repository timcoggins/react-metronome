/**
 * Main class for the metronome functionality, counts, steps and plays each sound
 */
import * as Tone from "tone";

class StepEngine {
    /**
     * Constructor
     * @param data array of steps
     */
    constructor(data) {

        // TODO Refactor the names of the counters, oscilater names like reset and alt need to be standardised
        // Data
        this.data = data;
        this.isPlaying = false;

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

        // See whether we play a step
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
            }
        }
    }

    /**
     * Resets the position to zero
     */
    setToZero = () => {
        this.currentStep = 0;
        this.currentLargeStep = 0;
        this.currentSubStep = 0;
    }

    /**
     * Updates the sound
     * @param primary
     * @param alt
     * @param reset
     */
    changeSound = (primary, alt, reset) => {
        this.osc.load(`./${primary}`)
        this.osc2.load(`./${alt}`)
        this.osc3.load(`./${reset}`)
    }

    /**
     * Updates the volume
     * @param volume
     */
    updateVolume = (volume) => {this.vol.volume.value = volume}

    /**
     * Mutes the alternate sound
      * @param muted
     */
    // TODO make this for the 3 sounds and standardise the method!
    muteAltSound = (muted) => this.osc2.mute = muted;
    toggleResetSound = () => this.useReset = !this.useReset;
}

export default StepEngine
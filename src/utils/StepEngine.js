/**
 * StepEngine.js
 * Main class for the metronome functionality, counts, steps and plays each sound
 */
import * as Tone from "tone";

class StepEngine {
    /**
     * Constructor
     * @param data array of steps
     */
    constructor(data) {


        // TODO check to see if the samples are loaded before playing
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
                if(this.currentStep >= this.data.length - 1) this.currentStep = 0
                else this.currentStep += 1;
            }
        }
    }

    /**
     * Starts Playback
     */
    start = () => {
        if(Tone.Transport.state === 'started') return
        // Reset back to zero
        this.setToZero()
        // Schedules the clock
        Tone.Transport.scheduleRepeat((time) => {
            this.step(time)
        }, "16n");
        // Start ToneJS
        Tone.start()
            .then(() => Tone.Transport.start())
        this.isPlaying = true;
    }

    /**
     * Stops Playback
     */
    stop = () => {
        if(Tone.Transport.state === 'stopped') return
        Tone.Transport.cancel()
        Tone.Transport.stop();
        this.isPlaying = false;
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
    updateSounds = (primary, alt, reset) => {
        this.osc.load(`./samples/${primary}`)
        this.osc2.load(`./samples/${alt}`)
        this.osc3.load(`./samples/${reset}`)
    }

    /**
     * Check if we are ready to begin playback
     */
    checkIfReady = () => {


    }

    /**
     * Updates the volume
     * @param volume
     */
    updateVolume = (volume) => {this.vol.volume.value = volume}

    /**
     * Mutes the sounds
      * @param muted
     */
    muteDownbeat = (muted) => this.osc.mute = muted;
    muteUpbeat = (muted) => this.osc2.mute = muted;
    muteRestart = (muted) => {
        this.useReset = !muted;
        this.osc3.mute = muted;
    }
}

export default StepEngine
import { LightningElement } from 'lwc';
import bellicon from '@salesforce/resourceUrl/bell';
import alarmtone from '@salesforce/resourceUrl/tone';

export default class Alarmclock extends LightningElement {
    alarmpic = bellicon;
    currentTimeString;
    selectedHour = '06';
    selectedMinute = '00';
    selectedampm = 'AM';

    // Hour options (01–12)
    houroptions = Array.from({ length: 12 }, (_, i) => {
        let h = (i + 1).toString().padStart(2, '0');
        return { label: h, value: h };
    });

    // Minute options (00–59)
    minuteoptions = Array.from({ length: 60 }, (_, i) => {
        let m = i.toString().padStart(2, '0');
        return { label: m, value: m };
    });

    // AM / PM options
    ampmoptions = [
        { label: 'AM', value: 'AM' },
        { label: 'PM', value: 'PM' }
    ];

    alarmMinutes = null;
    ringing = false;
    audio;

    connectedCallback() {
        this.updateTime();
        setInterval(() => this.updateTime(), 500);
      this.audio = new Audio(alarmtone + '/tone.mp3');
    }

    updateTime() {
        const now = new Date();
        let hh = now.getHours();
        const mm = now.getMinutes();
        const ss = now.getSeconds();
        const ampm = hh >= 12 ? 'PM' : 'AM';
        hh = hh % 12 || 12;

        this.currentTimeString = `${hh.toString().padStart(2, '0')}:${mm
            .toString()
            .padStart(2, '0')}:${ss.toString().padStart(2, '0')} ${ampm}`;

        if (this.alarmMinutes !== null) {
            const nowminutes = now.getHours() * 60 + now.getMinutes();
            if (nowminutes === this.alarmMinutes && ss === 0 && !this.ringing) {
                this.ringing = true;
                this.audio.play();
            }
        }
    }

    handledropdown(event) {
        const { name, value } = event.detail;
        if (name === 'hour') {
            this.selectedHour = value;
        }
        if (name === 'minute') {
            this.selectedMinute = value;
        }
        if (name === 'ampm') {
            this.selectedampm = value;
        }
    }

    handlesetalarm() {
        const hour = parseInt(this.selectedHour, 10);
        const minutes = parseInt(this.selectedMinute, 10);
        const ampm = this.selectedampm;
        this.alarmMinutes =
            (ampm === 'AM' ? hour % 12 : (hour % 12) + 12) * 60 + minutes;
    }

    handleclearalarm() {
        this.alarmMinutes = null;
        this.ringing = false;
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    get bellWrapperClass() {
        return `bell-wrapper ${this.ringing ? 'ringing' : ''}`;
    }
}
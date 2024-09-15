export class Input{
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown',e => {
            if((e.key === 'ArrowDown' ||
               e.key === 'ArrowUp' ||
               e.key === 'ArrowLeft' ||
               e.key === 'ArrowRight' ||
               e.key === 'a' ||
               e.key === 'd' ||
               e.key === 'q' ||
               e.key === 'e' ||
               e.key === 'w' ||
               e.key === 's' ||
               e.key === 'A' ||
               e.key === 'D' ||
               e.key === 'Q' ||
               e.key === 'E' ||
               e.key === 'W' ||
               e.key === 'S' ||
               e.key === 'Enter'||
               e.key === ' '||
               e.key === 'Shift'
             ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup',e => {
            if(e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'a' ||
                e.key === 'd' ||
                e.key === 'q' ||
                e.key === 'e' ||
                e.key === 'w' ||
                e.key === 's' ||
                e.key === 'w' ||
                e.key === 'A' ||
                e.key === 'D' ||
                e.key === 'Q' ||
                e.key === 'E' ||
                e.key === 'W' ||
                e.key === 'S' ||
                e.key === 'Enter' ||
                e.key === ' '||
                e.key === 'Shift'
            ){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    }
}
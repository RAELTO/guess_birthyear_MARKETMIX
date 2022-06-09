//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        persons: [
            {id: 1, name: 'Elizabeth Olsen', ybirth: '1989'},
            {id: 2, name: 'Ricardo Arjona', ybirth: '1964'},
        ],
        users:[
            {id: 1, name: 'RAEL', attempts: 1},
            {id: 2, name: 'test2', attempts: 3},
        ],
        showmessage: 1,
        message: '',
        showattempts: 1,
        showreg: 0,
        btntry: 1,
        attempt: 0,
        attmcount: 0,
        rattempts: 7,
        randomName: '',
        ranpos: 0,
        hint: '',
        ryearhint: '',
        username: '',
        hintcounter: 0,
    },
    methods: {
        tryatt(){
            const compare = parseInt(this.persons[this.ranpos].ybirth)
            if (this.attempt === compare) {
                this.attmcount += 1;
                this.message = 'Congratulations! you did it well!';
                this.showreg = 1;
                this.btntry = 0;
            }else if(this.attempt > compare){
                this.attmcount += 1;
                this.rattempts -= 1;
                this.message = `The given number is greater than ${this.randomName}'s year of birth`;
            }else if(this.attempt < compare){
                this.attmcount += 1;
                this.rattempts -= 1;
                this.message = `The given number is smaller than ${this.randomName}'s year of birth`;
            }

            if (this.rattempts <= 0) {
                this.message = 'You have reached the maximum attempts allowed, please complete the register form';
                this.showreg = 1;
                this.btntry = 0;
            }

            if (this.attmcount%2 == 0) {
                this.hintcounter += 1;
                const rhint1 = this.ryearhint[0];
                const rhint2 = this.ryearhint[1];
                const rhint3 = this.ryearhint[2];
                switch (this.hintcounter) {
                    case 1:
                        this.hint = `The year of birth has the number ${rhint1}`;
                        alert(this.hint);
                        break;
                    case 2:
                        this.hint = `The year of birth has the number ${rhint2}`;
                        alert(this.hint);
                        break;
                    case 3:
                        this.hint = `The year of birth has the number ${rhint3}`;
                        alert(this.hint);
                        break;
                
                    default:
                        break;
                }
            }

        },
        reg(){
            if (this.attmcount >= 0 && this.attmcount <= 1){
                this.users.unshift({
                    id: this.users.length + 1,
                    name: this.username,
                    attempts: this.attmcount
                });
            }else if(this.attmcount > 1 && this.attmcount <= 7){
                this.users.push({
                    id: this.users.length + 1,
                    name: this.username,
                    attempts: this.attmcount
                });
            }
        }
    },
    beforeMount(){
        function random(min, max) {// generates a random number to be used as index of perons array
            return Math.floor((Math.random() * (max - min + 1)) + min);
        }
        const rpos = random(0,1);//persons index

        this.randomName = this.persons[rpos].name; //display the name in the game view
        this.ranpos = rpos;

        const year = Array.from(this.persons[rpos].ybirth);
        let list = year;
        list = list.sort(function() {return Math.random() - 0.5});
        this.ryearhint = list;
    },
});

//LOGIC

var app = new Vue({
    el: '#app',
    data: {
        persons: [
            {id: 1, name: 'Elizabeth Olsen', ybirth: '1989'},
            {id: 2, name: 'Ricardo Arjona', ybirth: '1964'},
        ],
        users:[//users array to be displayed in the index.html table
            {id: 1, name: 'RAEL', attempts: 1},
            {id: 2, name: 'test2', attempts: 3},
        ],
        showmessage: 1,//enables the message
        message: '',//shows the main message comparing if the number is > or < than the year
        showattempts: 1,
        showreg: 0,//enables and shows the registration window
        btntry: 1,//enables or disable the Try button visualization
        attempt: 0,//year or number given from the user
        attmcount: 0,//user attempts counter
        rattempts: 7,//remaining attempts and attempts limit
        randomName: '',//display the name of the random person from the persons array
        ranpos: 0,//gives the random position or position from the random person from the array persons to be uses in operations
        hint: '',// shows the hint message
        ryearhint: '',//gives a random number not repeated from the persons array year of birth(ybirth)
        username: '',//User name to be added to the array persons
        hintcounter: 0,//counter that enables the dynamic hint message when the amount of pushed times the try button  is even
        restshow: 0,//enables and shows the restart button and message
    },
    methods: {
        tryatt(){
            const compare = parseInt(this.persons[this.ranpos].ybirth)
            if (this.attempt === compare) {
                this.attmcount += 1;
                this.message = 'Congratulations! you did it well!, please fill the registration form below to save your score';
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
                this.message = 'You have reached the maximum attempts allowed, please complete the registration form to restart the game';
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
                        this.hint = `Hint: The year of birth has the number ${rhint1}`;
                        alert(this.hint);
                        break;
                    case 2:
                        this.hint = `Hint: The year of birth has the number ${rhint2}`;
                        alert(this.hint);
                        break;
                    case 3:
                        this.hint = `Hint: The year of birth has the number ${rhint3}`;
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

            this.restshow = 1;
        },
        restart(){
            this.attmcount = 0;
            this.attempt = 0;
            this.rattempts = 7;
            this.showreg = 0;
            this.btntry = 1;
            this.restshow = 0;
            this.username = '';
            function random(min, max) {// generates a random number to be used as index of perons array
                return Math.floor((Math.random() * (max - min + 1)) + min);
            }
            const rpos = random(0,1);//persons index
    
            this.randomName = this.persons[rpos].name; //display the name in the game view
            this.ranpos = rpos;
    
            const year = Array.from(this.persons[rpos].ybirth);//saves the ybirth string in the persons array as a new array
            let list = year;
            list = list.sort(function() {return Math.random() - 0.5}); //sorts the numbers in array randomly
            this.ryearhint = list;
        }
    },
    beforeMount(){
        function random(min, max) {// generates a random number to be used as index of perons array
            return Math.floor((Math.random() * (max - min + 1)) + min);
        }
        const rpos = random(0,1);//persons index

        this.randomName = this.persons[rpos].name; //display the name in the game view
        this.ranpos = rpos;

        const year = Array.from(this.persons[rpos].ybirth);//saves the ybirth string in the persons array as a new array
        let list = year;
        list = list.sort(function() {return Math.random() - 0.5}); //sorts the numbers in array randomly
        this.ryearhint = list;
    },
});

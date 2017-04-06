module.exports = (Plugin, BD, Vendor) => {

    const { Api, Events, Storage } = BD;
    const { $, React } = Vendor;

    class V2Plugin extends Plugin {

        constructor(props) {
            super(props);
        }

        autoScroll() {
            var interval = setInterval(function() {
                var messages = document.getElementsByClassName("messages")[0];
                
                if (messages != undefined) { 
                    clearInterval(interval);
                    messages.scrollTop = messages.scrollHeight;
                }
            }, 100); 
        }

        onStart() {
            Api.log('auto-scroll loaded');
            
            this.guilds = document.getElementsByClassName("guild"); 
            
            for (var i = 0; i < this.guilds.length; i++) { 
                this.guilds[i].addEventListener("click", this.autoScroll);
            }

            return true;
        }

        onStop() {
            Api.log('auto-scroll unloaded');
            
            for (var i = 0; i < this.guilds.length; i++) { 
                this.guilds[i].removeEventListener("click", this.autoScroll);
            }

            return true;
        }

        onSave() {
        
        }
    }

    return V2Plugin;
};

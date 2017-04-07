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
                    pluginObject.updateHandlers()
                }
            }, 100); 
        }

        updateHandlers() {
            var elements = document.querySelectorAll(".guild, .channel-text > a");
            this.handlerElements = [];

            for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener("click", this.autoScroll);
                this.handlerElements.push(elements[i]);
            }
        }

        onStart() {
            Api.log('auto-scroll loaded');
            global.pluginObject = this;

            this.updateHandlers(); 
            
            return true;
        }

        onStop() {
            Api.log('auto-scroll unloaded');
            
            for (var i = 0; i < this.handlerElements.length; i++) { 
                this.handlerElements[i].removeEventListener("click", this.autoScroll);
            }

            return true;
        }

        onSave() {
        
        }
    }

    return V2Plugin;
};

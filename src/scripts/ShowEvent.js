export const SHOW_EVENT = "show_event";

class ShowEvent extends CustomEvent {
    constructor(html){
        super(SHOW_EVENT,{detail: html});
    };
}

export default ShowEvent;
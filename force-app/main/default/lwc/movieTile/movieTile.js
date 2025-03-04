import { LightningElement , api} from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;
    @api selectedMovieId='';  
    clickHandler(event)
    {
        console.log('Tile clicked: '+this.movie.Title);
        //custom event
        const evt=new CustomEvent('selectedmovie',{
            detail:this.movie.imdbID
        });
        //dispatch
        this.dispatchEvent(evt);
    }
    get tileSelected(){
        return this.selectedMovieId===this.movie.imdbID?"selected":"tile";
    }  

}
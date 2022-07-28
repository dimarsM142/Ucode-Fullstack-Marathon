exports.getAnonymous = function(name, alias, affiliation)  {
    let Mandarin = class first_class{
        constructor(){}
        get name(){
            return name;
        }
        get alias(){
            return alias;
        }
        get affiliation(){
            return affiliation;
        }

    }
    first_Mandarin = new Mandarin;
    return first_Mandarin;
}

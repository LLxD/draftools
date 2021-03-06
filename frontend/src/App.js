import Navbar from './components/Navbar'
import Teams from './components/Teams'
import ChampionList from './components/ChampionList'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Search from './components/Search';
import Alert from './components/Alert'




function App() {

    const [blueTeam, setBlueTeam] = useState([]);
    const [redTeam, setRedTeam] = useState([]);
    const [champions, setChampions] = useState([]);
    const [searchChampion, setSearchChampions] = useState([]);
    const [searchString, setSearchString] = useState("");

    const loadChampions = () => {
        axios.get('https://5540-moccasin-clam-pfyfi3q8.ws-us03.gitpod.io/champions').then((response) => {
            setChampions(response.data);
            setSearchChampions(response.data)
        });
    };

    useEffect(() => {
        loadChampions();
    }, []);


    useEffect(() => {
        if (searchString) {
            const filtrados = champions.filter(objeto => objeto.name.toLowerCase().includes(searchString))
            setSearchChampions(filtrados)
        } else {
            setSearchChampions(champions)
        }
    }, [searchString, champions]);


    const addChampion = (champion, team) => {
        switch (team) {
            case 'blue':
                setBlueTeam(blueTeam => blueTeam.length < 5 ? ([...blueTeam, champion]) : (blueTeam));
                break;
            case 'red':
                setRedTeam(redTeam => redTeam.length < 5 ? ([...redTeam, champion]) : (redTeam));
                break;
            default:
                break;
        }
    };

    const champion_suggestion = [
        {
            "name": "Aatrox",
            "tags": [
                "Fighter",
                "Tank"
            ],
            "key": "266",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Aatrox.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg"
        },
        {
            "name": "Ahri",
            "tags": [
                "Mage",
                "Assassin"
            ],
            "key": "103",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Ahri.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg"
        },
        {
            "name": "Akali",
            "tags": [
                "Assassin"
            ],
            "key": "84",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Akali.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Akali_0.jpg"
        },
        {
            "name": "Alistar",
            "tags": [
                "Tank",
                "Support"
            ],
            "key": "12",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Alistar.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Alistar_0.jpg"
        },
        {
            "name": "Amumu",
            "tags": [
                "Tank",
                "Mage"
            ],
            "key": "32",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Amumu.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Amumu_0.jpg"
        },
        {
            "name": "Anivia",
            "tags": [
                "Mage",
                "Support"
            ],
            "key": "34",
            "square_image": "http://ddragon.leagueoflegends.com/cdn/11.8.1/img/champion/Anivia.png",
            "loading_image": "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Anivia_0.jpg"
        }
    ];

    const removeChampion = (index, team) => {
        switch (team) {
            case 'blue':
                setBlueTeam(blueTeam => blueTeam.filter((_champ, i) => i !== Number(index)));
                break;
            case 'red':
                setRedTeam(redTeam => redTeam.filter((_champ, i) => i !== Number(index)));
                break;
            default:
                break;
        }
    };


    useEffect(() => {
        axios.post('https://5540-moccasin-clam-pfyfi3q8.ws-us03.gitpod.io/result', {
            redTeam,
            blueTeam
        }).then((response) => {
            console.log(response);
        })

    }, [redTeam, blueTeam])


    return (
        <div>
            <Navbar />
            <DndProvider backend={HTML5Backend}>
                <Alert champion_suggestion={champion_suggestion} type={"success"} addChampion={addChampion} />
                <Teams blueTeam={blueTeam} redTeam={redTeam} removeChampion={removeChampion} />
                <div className="container">
                    <Search searchString={searchString} setSearchString={setSearchString} />
                    <ChampionList searchChampion={searchChampion} addChampion={addChampion} champions={champions} name={champions.name} key={champions.key} />
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
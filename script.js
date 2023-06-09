const audioClips = [{
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}]

function App() {

    const [volume, setVolume] = React.useState(1);
    const [currentClipId, setCurrentClipId] = React.useState(""); 

  const updateDisplay = (clipId) => {
    setCurrentClipId(clipId);
  };

  const volumeRef = React.useRef(volume);

  React.useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  

    return <div className="container m-1 p-1 d-flex justify-content-center align-items-center"
        id="drum-machine">
        <div id="pad-wrap" className="m-3 p-3">
            {audioClips.map(clip => (
                <Pad key={clip.id} 
                clip={clip} 
                volume={volume} 
                updateDisplay={updateDisplay} 
                volumeRef={volumeRef}
                />
            ))}
        </div>
        <div id="controls-wrap" className="m-3 p-3">
            <div
                id="volume-wrap"
                className="d-flex justify-content-center align-items-center"
            >
                <i className="fa fa-volume-up"></i>
                <input
                    type= "range"
                    id="volumeSlider"
                    max="1"
                    min="0"
                    step="0.01"
                    value={volume}
                    onChange={(e)=> setVolume(e.target.value)}
                />
            </div>
            <p id="display" className="m-3 p-3 text-light">{currentClipId}</p>
        </div>
    </div>;
}

function Pad({ clip, volume, updateDisplay, volumeRef }) {

    const [current, setCurrent] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [])


    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode) {
          playSound(); 
        }
      };


    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setCurrent(true);
        setTimeout(()=> setCurrent(false),200);
        audioTag.volume = volumeRef.current;
        audioTag.currentTime = 0;
        updateDisplay(clip.id); 
        audioTag.play();
    }

    const handleClick = () => {
        playSound(volume); 
      };

    return (
        <div className={`drum-pad ${current && 'btn btn-light'}`} onClick={playSound}>
            <audio className="clip" id={clip.keyTrigger} src={clip.url} />
            {clip.keyTrigger}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
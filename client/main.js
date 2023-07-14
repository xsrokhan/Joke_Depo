
function getJokes() {
  return fetch("http://localhost:3001/")
    .then(response => response.json())
    .then(data => {
      return data
    })
}


function run() {
  getJokes().then((jokes) => {
    let arrs = {
      "arrEn": jokes.filter(a => a.lang === "En").map(b => b.joke),
      "arrAz": jokes.filter(a => a.lang === "Az").map(b => b.joke),
      "arrRu": jokes.filter(a => a.lang === "Ru").map(b => b.joke),
      "arrFa": jokes.filter(a => a.lang === "Fa").map(b => b.joke),
      "arrFr": jokes.filter(a => a.lang === "Fr").map(b => b.joke),
      "arrAr": jokes.filter(a => a.lang === "Ar").map(b => b.joke),
      "arrSp": jokes.filter(a => a.lang === "Sp").map(b => b.joke),
    }

    let currentJokes = []

    let langs = {
      "En": false,
      "Az": false,
      "Ru": false,
      "Fa": false,
      "Fr": false,
      "Ar": false,
      "Sp": false
    }

    let langClasses = ["En", "Az", "Ru", "Fa", "Fr", "Ar", "Sp"]
    let circles = ["circEn", "circAz", "circRu", "circFa", "circFr", "circAr", "circSp"]

    let memes = [document.querySelector('.meme1'),
    document.querySelector('.meme2'),
    document.querySelector('.meme3'),
    document.querySelector('.meme4'),
    document.querySelector('.meme5'),
    document.querySelector('.meme6'),
    document.querySelector('.meme7'),
    document.querySelector('.meme8'),
    document.querySelector('.meme9'),
    document.querySelector('.meme10'),
    document.querySelector('.meme11')]

    function processJoke() {
      let idx = Math.floor(Math.random() * currentJokes.length)
      let joke = currentJokes[idx]
      if (joke.includes('?') || joke.includes('؟')) {
        let questionMark = joke.indexOf('?') > -1 ? joke.indexOf('?') : joke.indexOf('؟')
        let question = joke.slice(0, questionMark + 1)
        let answer = joke.slice(questionMark + 2, joke.length)
        return [question, answer, idx]
      } else {
        return [joke, idx]
      }
    }

    function displayMemes() {
      let n = Math.random()
      if (n > 0.2) {
        let flip = Math.random() > 0.5 ? true : false
        let idx = Math.floor(Math.random() * memes.length)
        let meme = memes[idx]
        memes.forEach(a => a.style.display = 'none')
        if (flip) {
          meme.style.transform = "scaleX(-1)"
        } else {
          meme.style.transform = "scaleX(1)"
        }
        meme.style.display = 'inline'
      }
    }

    let memeTimeout

    document.querySelector('.next').addEventListener('click', () => {
      clearTimeout(memeTimeout)
      function getPrompts() {
        let prompts = {
          "En": ["Next", "Reset", "Hope you enjoyed!"],
          "Az": ["Növbəti", "Yenidən", "Ümid edirəm bəyəndiniz!"],
          "Ru": ["Далее", "Заново", "Надеюсь вам понравилось!"],
          "Fa": ["بعدی", "یه بار دیگه", "!امیدوارم خوشتون اومده باشه"],
          "Fr": ["Suivant", "Réinitialiser", "J\'espère que ça vous a plu!"],
          "Ar": ["التالي", "إعادة", "اتمني يكون عجبكم"],
          "Sp": ["Siguiente", "Reiniciar", "Espero que les haya gustado!"]
        }
        let prompt = Object.keys(langs).filter(a => langs[a])[0]
        return prompts[prompt]
      }

      let result = currentJokes.length === 0 ? [] : processJoke()
      if (result.length === 2) {
        currentJokes.splice(result[1], 1)
        document.querySelector('.question').innerHTML = result[0]
        document.querySelector('.answer').style.visibility = 'hidden'
        document.querySelector('.reveal').style.visibility = 'hidden'
        document.querySelector('.next').innerHTML = getPrompts()[0]
        memeTimeout = setTimeout(() => {
          displayMemes()
        }, 4000);
      } else if (result.length === 3) {
        currentJokes.splice(result[2], 1)
        document.querySelector('.question').innerHTML = result[0]
        document.querySelector('.answer').innerHTML = result[1]
        document.querySelector('.reveal').style.visibility = 'visible'
        document.querySelector('.answer').style.visibility = 'hidden'
        document.querySelector('.next').innerHTML = getPrompts()[0]
      } else {
        document.querySelector('.next').style.display = 'none'
        document.querySelector('.reset').innerHTML = getPrompts()[1]
        document.querySelector('.reset').style.display = 'block'
        document.querySelector('.question').innerHTML = getPrompts()[2]
        document.querySelector('.answer').style.visibility = 'hidden'
        document.querySelector('.reveal').style.visibility = 'hidden'
      }
    })


    document.querySelector('.reveal').addEventListener('click', () => {
      displayMemes()
      document.querySelector('.answer').style.visibility = 'visible'
      document.querySelector('.reveal').style.visibility = 'hidden'
    })


    document.querySelector('.reset').addEventListener('click', () => {
      langClasses.forEach(a => {
        langs[a] = false
        document.querySelector(`.flag${a}`).classList.remove('showFlag')
        arrs[`arr${a}`] = jokes.filter(b => b.lang === `${a}`).map(c => c.joke)
        document.querySelector(`.circ${a}`).classList.remove('showCircle')
      })

      memes.forEach(a => a.style.display = 'none')
      document.querySelector('.question').innerHTML = 'Choose a language'
      document.querySelector('.reset').style.display = 'none'
    })


    for (let i = 0; i < langClasses.length; i++) {
      let classes = document.querySelectorAll(`.${langClasses[i]}`)
      classes.forEach(function (clas$) {
        clas$.addEventListener("click", function () {
          clearTimeout(memeTimeout)

          let text = {
            "En": ["Start", "Click start"],
            "Az": ['Getdux', "Bas e bas getsin"],
            "Ru": ["Начать", "Нажми Начать"],
            "Fa": ['شروع', 'بزن بریم'],
            "Fr": ['Démarrer', 'Cliquez sur Démarrer'],
            "Ar": ['یلا یلا', 'یلا بینا'],
            "Sp": ['Inicio', "Haga clic en Inicio"]
          }

          let thisLang = this.classList[1]
          if (langs[thisLang] === false) {
            document.querySelector('.answer').style.visibility = 'hidden'
            document.querySelector('.reveal').style.visibility = 'hidden'
            document.querySelector('.next').innerHTML = text[thisLang][0]
            document.querySelector('.question').innerHTML = text[thisLang][1]
            document.querySelector('.next').style.display = 'block'
            document.querySelector('.reset').style.display = 'none'
            let otherLangs = langClasses.filter(a => a !== thisLang)
            otherLangs.forEach(a => langs[a] = false)
            langs[thisLang] = true
            Object.entries(langs).forEach(b => b[1] ? currentJokes = arrs[`arr${b[0]}`] : currentJokes)
            let thisCircle = document.querySelector(`.circ${thisLang}`)
            let thisFlag = document.querySelector(`.flag${thisLang}`)
            let others = circles.filter(a => a !== `circ${thisLang}`)
            thisCircle.classList.add("showCircle")
            thisFlag.classList.add("showFlag")
            others.forEach(a => {
              document.querySelector(`.${a}`).classList.remove('showCircle')
              document.querySelector(`.flag${a.slice(-2)}`).classList.remove('showFlag')
            })
          }
        })
      })
    }

    let newJokeBtn = document.querySelectorAll(".newJoke");

    newJokeBtn.forEach(btn => {
      btn.addEventListener("click", () => document.querySelector("dialog").showModal())
    });

    document.querySelector(".close").addEventListener("click", () => {
      document.querySelector("dialog").close()
    })

    document.querySelector(".login-btn").addEventListener("click", () => {
      let pw = document.querySelector("input").value
      fetch("http://localhost:3001/login", {
        method: 'POST',
        body: JSON.stringify({
          input: pw
        }),
        headers: {
          'Content-type': 'application/json',
        }
      }).then(res => res.json()).then(data => {

        document.querySelector(".login-page").style.display = "none"
        document.querySelector("section").style.opacity = "1"

        document.querySelector(".submit").addEventListener('click', function (e) {
          e.preventDefault()

          var lang = document.querySelector("select").value
          var joke = document.querySelector("textarea").value

          fetch(`http://localhost:3001/${data.newJoke}`, {
            method: 'POST',
            body: JSON.stringify({
              lang,
              joke,
            }),
            headers: {
              'Content-type': 'application/json',
            }
          })
          document.querySelector("textarea").value = ""
        });
      })

    })
  })
}

run()





let list = document.querySelector('.list')
let loader1 = document.querySelector('.honeycomb')
let loader2 = document.querySelector('.wrapper-load')
let info = document.querySelector('.inf')



const createItem = (name, urlId) => {
    const item = document.createElement('div')
    item.classList.add('item')

    const title = document.createElement('h2')
    title.classList.add('title')
    title.innerText = name

    const btnMore = document.createElement('button')
    btnMore.classList.add('veiw-more')
    btnMore.innerText = 'More'

    btnMore.onclick = () => {
        info.textContent = ''
        loader2.classList.remove('hide')
        loader2.classList.add('show')
        getItems(urlId).then((d) => {
            document.querySelector('.active-item')?.classList.remove('active-item')
            item.classList.add('active-item')
            loader2.classList.remove('show')
            loader2.classList.add('hide')
            maKeInfo(d)
        });
    }

    item.append(title, btnMore)
    return item

}

const maKeInfo = (df) => {
    const image = document.createElement('img')
    const pre = document.createElement('pre')
    const arrUrl = df.url.split('/')
    const pageNum = arrUrl[arrUrl.length - 2]
    if (df.manufacturer)
        {
            fetch(`https://starwars-visualguide.com/assets/img/starships/${pageNum}.jpg`).then((d) => {
                if (d.status == '404' || d.ok == false){
                    image.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                else {
                    image.src = d.url
                }
            })
            
            pre.textContent = 'Model: ' + df.model + '\n' + 'Manufacturer: ' + df.manufacturer + '\n' + 'Price: ' + df.cost_in_credits +
            '\n' + 'Length: ' + df.length + '\n' + 'Max speed: ' + df.max_atmosphering_speed + '\n' + 'Crew: ' + df.crew + '\n' +
            'Passengers: ' + df.passengers + '\n' + 'Starship class: ' + df.starship_class + '\n' + 'ect...'

        } else if (df.gender) {
            fetch(`https://starwars-visualguide.com/assets/img/characters/${pageNum}.jpg`).then((d) => {
                if (d.status == '404' || d.ok == false){
                    image.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                else {
                    image.src = d.url
                }
            })
            pre.textContent = 'Gender: ' + df.gender + '\n' + 'Hair color: ' + df.hair_color + '\n' + 'Height: ' + df.height +
            '\n' + 'Mass: ' + df.mass + '\n' + 'Name: ' + df.name + '\n' + 'Eye color: ' + df.eye_color + '\n' + 'Skin color: ' + df.skin_color + '\n' + 'ect...'
        } else if (df.climate) {
            fetch(`https://starwars-visualguide.com/assets/img/planets/${pageNum}.jpg`).then((d) => {
                if (d.status == '404' || d.ok == false){
                    image.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
                }
                else {
                    image.src = d.url
                }
            })
            pre.textContent = 'Name: ' + df.name + '\n' + 'Climate: ' + df.climate + '\n' + 'Diameter: ' + df.diameter + '\n' + 'Gravity: ' + df.gravity +
            '\n' + 'Orbital period: ' + df.orbital_period + '\n' + 'Population: ' + df.population + '\n' + 'Rotation period: ' + df.rotation_period +
            '\n' + 'Surface water: ' + df.surface_water + '\n' + 'Terrain: ' + df.terrain + '\n' + 'ect...'
        }

        
        info.append(image, pre)
        
}

const makeList = (array) => {
    array.forEach(element => {
        list.append(createItem(element.name, element.url))
    })
}


const getItems = async (url) => {
    try {
        const response = await fetch(url)
        const data = response.json()
        return data
    }
    catch (error) {
        alert('Error')
    }

}

ships.onclick = () => {
    info.innerText = ''
    list.innerText = ''
    loader1.classList.remove('hide')
    loader1.classList.add('show')
    Promise.all([getItems('https://swapi.dev/api/starships/?page=1'), getItems('https://swapi.dev/api/starships/?page=2'), getItems('https://swapi.dev/api/starships/?page=3'), getItems('https://swapi.dev/api/starships/?page=4')])
        .then((d) => {
            loader1.classList.remove('show')
            loader1.classList.add('hide')
            d.forEach(page => {
                makeList(page.results)
            })
        })


}

characters.onclick = () => {
    info.innerText = ''
    list.innerText = ''
    loader1.classList.remove('hide')
    loader1.classList.add('show')
    Promise.all([getItems('https://swapi.dev/api/people/?page=1'), getItems('https://swapi.dev/api/people/?page=2'), getItems('https://swapi.dev/api/people/?page=3'), getItems('https://swapi.dev/api/people/?page=4'), getItems('https://swapi.dev/api/people/?page=5'), getItems('https://swapi.dev/api/people/?page=6'), getItems('https://swapi.dev/api/people/?page=7'), getItems('https://swapi.dev/api/people/?page=8'), getItems('https://swapi.dev/api/people/?page=9')])
        .then((d) => {
            loader1.classList.remove('show')
            loader1.classList.add('hide')
            d.forEach(page => {
                makeList(page.results)
            })
        })

}

planets.onclick = () => {
    info.innerText = ''
    list.innerText = ''
    loader1.classList.remove('hide')
    loader1.classList.add('show')
    Promise.all([getItems('https://swapi.dev/api/planets/?page=1'), getItems('https://swapi.dev/api/planets/?page=2'), getItems('https://swapi.dev/api/planets/?page=3'), getItems('https://swapi.dev/api/planets/?page=4'), getItems('https://swapi.dev/api/planets/?page=5'), getItems('https://swapi.dev/api/planets/?page=6')])
        .then((d) => {
            loader1.classList.remove('show')
            loader1.classList.add('hide')
            d.forEach(page => {
                makeList(page.results)
            })
        })
    
}


<template>
    <div v-if="pokemon" class="container">
        <div class="pkmn">
            <img class="image" ref="pokemonImage" />

            <div class="name">
                <p>
                    #{{ pokemon.number }}
                    {{ pokemon.name }}</p>
            </div>
            <div class="types">
                <img class="typeImage" ref="type1" alt="">
                <img class="typeImage" ref="type2" alt="">
            </div>
        </div>

        <div class="info">
            <p class="desc">
                <span class="title">Descripción</span>
                {{ pokemon.description }}
            </p>
            <div v-if="pokemon" class="radar">
                <Radar v-show="pokemon" :data="data" :options="options" />
            </div>
            <span class="title">Habilidad</span>
            <span class="title">Movimientos</span>

        </div>
    </div>
</template>

<script lang="ts">
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'vue-chartjs'
import { data, options } from '../config'
import { defineComponent, onMounted, ref } from 'vue'
import { axios } from '../config'

ChartJS.register(
    RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend
)

export default defineComponent({
    name: 'App',
    components: {
        Radar
    },
    setup() {
        const pokemon = ref()
        const type1 = ref<HTMLImageElement>()
        const type2 = ref<HTMLImageElement>()
        const pokemonImage = ref<HTMLImageElement>()

        const fetchData = async () => {
            try {
                const response = await axios.get('/pokemon')
                pokemon.value = response.data.data[0]
            } catch (err) {
                console.log(err)
            }
        }

        const setImages = () => {
            if(type1.value && pokemon.value.type1.imageUrl) {
                type1.value.src = pokemon.value.type1.imageUrl
            }
            if(type2.value && pokemon.value.type2.imageUrl) {
                type2.value.src = pokemon.value.type2.imageUrl
            }
            if(pokemonImage.value) {
                pokemonImage.value.src = pokemon.value.imageUrl
            }
        }

        onMounted(async() => {
            await fetchData()
            setImages()
        })

        const data = {
            labels: [
                'Hp',
                'AtaEsp',
                'DefEsp',
                'Velocidad',
                'Defensa',
                'Ataque',
            ],
            datasets: [
                {
                    label: 'Estadisticas',
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [pokemon.value?.hp, pokemon.value?.spAttack, pokemon.value?.spDefense, pokemon.value?.speed, pokemon.value?.defense, pokemon.value?.attack],
                }
            ],
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    suggestedMin: 10,
                }
            },
            beginAtZero: true,
        }

        return {
            data,
            options,
            pokemon,
            type1, type2,
            pokemonImage
        }
    }
})
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        height: 140vh;
    }
}

.pkmn {
    width: 100%;
    height: 100%;
    background-image: url('woods.jpg');
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.info {
    width: 100%;
    height: 100%;
    padding: 4rem 3.2rem;
}

.radar {
    width: 26rem;
    height: 26rem;
    margin: auto;
}

.title {
    font-size: 2.4rem;
    display: block;
    font-family: 800;
    margin-bottom: .8rem;
}

.desc {
    font-family: 'Ubuntu';
    font-size: 1.8rem;
    padding-bottom: 1.6rem;
}

.image {
    margin-top: 8rem;
    width: 40rem;
    position: relative;

    &::before {
        content: "ピカチュウ";
        position: absolute;
        font-size: 333rem;
        color: red;
        z-index: 11;
        white-space: nowrap;
        user-select: none;
    }
}

.name {
    p {
        color: white;
        font-size: 2.4rem;
    }
}

.types {
    padding: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
}

.typeImage {
    height: 2.4rem;
}
</style>
const form = document.querySelector('form');
const kirim = form.querySelector('#kirim');

const popUp = (globalRadiation) => {
    const popUp = document.querySelector('#pop-up');
    popUp.style.display = 'block';

    popUp.innerHTML = `
        <p>Global Radiation: ${globalRadiation}</p>
        <div id="pop-up-footer">
            <button>Oke</button>
        </div>
    `;

    const button = popUp.querySelector('button');
    button.addEventListener('click', () => {
        popUp.style.display = 'none';
    });
};

const kirimCiriCiriBuah = async () => {
    const sunshine = form.querySelector('#sunshine').value;
    const maxTemp = form.querySelector('#max_temp').value;
    const meanTemp = form.querySelector('#mean_temp').value;
    const minTemp = form.querySelector('#min_temp').value;

    const data = {
        sunshine: parseFloat(sunshine),
        max_temp: parseFloat(maxTemp),
        mean_temp: parseFloat(meanTemp),
        min_temp: parseFloat(minTemp),
    };

    const response = await fetch('http://localhost:5000/global-radiation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result)

    form.querySelector('#sunshine').value = '';
    form.querySelector('#max_temp').value = '';
    form.querySelector('#mean_temp').value = '';
    form.querySelector('#min_temp').value = 'Juicy';
    popUp(result['global_radiation']);
};

kirim.addEventListener('click', kirimCiriCiriBuah);

console.log(`
	Ctr-d - delete all;
	Ctr-t - create table & pain sq;
`);

const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const leftSpace = 295;

let isCtr = false;

let rad = 3;
let isDrawing = false;
let sqLen = 10;
let lineColor = '#ff0000';


const thickChanger = document.querySelector('.thickCh');
const thickLabel = document.querySelector('.thickLab');
const inputColor = document.querySelector('.colorCh');

thickChanger.value = rad;
inputColor.value = lineColor;

setInterval(()=> {
	thickLabel.innerText = 'Thickness: ' + thickChanger.value + 'px';
	rad = thickChanger.value;

	lineColor = inputColor.value;
}, 100);


const inputName = document.querySelector('.inputObj');
const btnSend = document.querySelector('.sendObj');

let whatSend = '';
let glGrid = [];


btnSend.addEventListener('click', () => {
	whatSend = inputName.value;
	if (glGrid.length !== 0) {
		fetch("/api/grid", {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({grid: glGrid, name: whatSend})
		})
	} else {
		console.log('ERROR: You don\'t convert png to pixels! ')
	}
})


function drSpRect(x, y, w, h, rColor, bColor, thick) {
	ctx.lineWidth = thick;
	ctx.strokeStyle = bColor;
	ctx.strokeRect(x, y, w, h);

	ctx.fillStyle = rColor;
	ctx.fillRect(x + thick, y + thick, w - 2 * thick, h - 2 * thick);
}

function drTable(sqLen, arr) {
	for (var i = 0; i < (500 / sqLen); i++) {
		for (var a = 0; a < (500 / sqLen); a++) {
			if (arr[i][a]) {
				drSpRect(a * sqLen, i * sqLen, 500 / sqLen, 500 / sqLen, lineColor, '#000', 1);
			} else {
				drSpRect(a * sqLen, i * sqLen, 500 / sqLen, 500 / sqLen, '#fff', '#000', 1);
			}
		}
	}
}

function clearCanv() {
	ctx.clearRect(0, 0, 500, 500);

	glGrid = []

	console.clear();
	console.log(`
		Ctr-d - delete all;
		Ctr-t - create table & pain sq;
	`);
}



document.addEventListener('mousedown', e => {
	isDrawing = true;
});

document.addEventListener('mouseup', e => {
	isDrawing = false;
	ctx.beginPath();
});


document.addEventListener('mousemove', e => {
	if (isDrawing) {
		ctx.lineWidth = rad * 2;
		ctx.strokeStyle = lineColor;
		ctx.lineTo(e.clientX - leftSpace, e.clientY - 60);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = lineColor;
		ctx.arc(e.clientX - leftSpace, e.clientY - 60, rad,0 , 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(e.clientX - leftSpace, e.clientY - 60);
	}
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Control') {
		isCtr = true;
	}

	if (e.key === 'd' && isCtr) {
		clearCanv();
	}

	if (e.key === 't' && isCtr) {
		let vGrid = [];

		for (var i = 0; i < (500 / sqLen); i++) {
			let vSlo = [];

			for (var a = 0; a < (500 / sqLen); a++) {
				const data = ctx.getImageData(a * sqLen, i * sqLen, sqLen, sqLen);
				let isSt = 0;


				for (var b = 0; b < data.data.length; b++) {
					const isEmpty = data.data[b] === 0;

					if (!isEmpty) {
						isSt = 1;
					}
				}

				vSlo.push(isSt);
				isSt = 0;
			}

			vGrid.push(vSlo);
		}

		clearCanv();

		glGrid = vGrid;		

		drTable(sqLen, vGrid);
	}
});

document.addEventListener('keyup', (e) => {
	if (e.key === 'Control') {
		isCtr = false;
	}
});

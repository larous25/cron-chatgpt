const OpenAI = require('openai')
const mysql = require('mysql');
const util = require('util');
const cron = require('node-cron');

require('dotenv').config();




async function connectionExample() {
	const op = new OpenAI({
		apiKey: process.env.API
	})

	try {

		const connection = mysql.createConnection({
			host: process.env.HOST,
			user: process.env.USER,
			password: process.env.PASS,
			database: process.env.DB
		});

		let conn = await connection.connect()

		const query = util.promisify(connection.query).bind(connection)
		// CAMBIAR POR SU TABLA
		let rows = await query('SELECT * FROM nuevas_noticias')
		rows.forEach(async newArticle => {
			console.log(newArticle)
			// CAMBIAR POR SU TABLA E ID
			let article = await query('SELECT * FROM consulta WHERE idconsulta = ?', [newArticle.consulta_idconsulta]);

			const chatCompletion = await op.chat.completions.create({
				messages: [{ role: 'user', content: `Haz un resumen del texto que te doy a continuación: "${article.articulo}"` }],
				model: 'gpt-3.5-turbo',
			});

			await query('UPDATE consulta SET resumen = ? WHERE id = ?', [chatCompletion.choices, article.idconsulta]);

			// 	// Delete record
			await query('DELETE FROM your_table WHERE id = ?', [newArticle.id]);
		})
	} catch (error) {
		console.log(error)
	}

}


// cron.schedule('0 * * * *', async () => {

connectionExample();




// }, {
//   scheduled: true,
//   timezone: "America/Sao_Paulo"
// });
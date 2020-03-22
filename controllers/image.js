import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '16d61986c2614b2ca03c469e742ec1c3'
});

const handleApiCall = (req, res) => {
	app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json('unable to get entries');
	})
}

export { handleImage, handleApiCall };
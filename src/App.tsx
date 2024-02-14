import { useRef, useState } from 'react';
import './App.scss';
import { PromptSection } from './components';

const EXAMPLES = [
	'src/assets/images/examples/example 1.jpg',
	'src/assets/images/examples/example 2.jpg',
	'src/assets/images/examples/example 3.jpg',
	'src/assets/images/examples/example 4.jpg',
];

function App() {
	const [photo, setPhoto] = useState<string | null>(null);
	const [selectedExample, setSelectedExample] = useState<string | null>(null);
	const [text, setText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [option, setOption] = useState<number>(-1);
	const [showVideo, setShowVideo] = useState<boolean>(false);

	const handleUpload = async (file: File | undefined) => {
		if (!file) return;

		setOption(1);
		setLoading(true);
		setError(null);
		try {
			// const formData = new FormData();
			// formData.append('file', file);
			// const response = await fetch('http://localhost:5000/upload', {
			// 	method: 'POST',
			// 	body: formData,
			// });
			// const data = await response.json();
			setPhoto(URL.createObjectURL(file));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleGenerateVideo = async () => {
		setLoading(true);
		setShowVideo(false);
		setTimeout(() => {
			setLoading(false);
			setShowVideo(true);
		}, 3000);
	};

	const ref = useRef<HTMLLabelElement>(null);

	return (
		<>
			<h1>🦈 MotionShark</h1>

			{/* Add file upload */}
			<div className='button-list'>
				<label htmlFor='file-upload' ref={ref}>
					<input
						id='file-upload'
						accept='image/*'
						type='file'
						hidden
						onChange={(e) => handleUpload(e?.target?.files?.[0])}
					/>
					<button
						type='button'
						onClick={() => {
							if (ref.current) {
								ref.current.click();
							}
						}}>
						Upload Photo
					</button>
				</label>

				<button onClick={() => setOption(2)}>Write it</button>
				<button onClick={() => setOption(3)}>Examples</button>
			</div>

			{/* Display photo */}
			{option === 1 && photo && (
				<div style={{marginTop: 20}}>
					<img className='img-wrapper' width={700} src={photo} alt='Uploaded' />
				</div>
			)}

			{/* Display text */}
			{option === 2 && <PromptSection text={text} setText={setText} />}

			{/* Display examples */}
			{option === 3 && (
				<div className='examples-list'>
					{EXAMPLES.map((example) => (
						<div className='wrapper'>
							<img
								onClick={() => setSelectedExample(example)}
								className='img-wrapper'
								width={200}
								src={example}
								alt='Example'
							/>
						</div>
					))}
				</div>
			)}

			{/* Generate Button */}
			{!loading && (
				<button className='generate-button' onClick={handleGenerateVideo}>
					Generate Video
				</button>
			)}

			{/* Display loading, using loading gif in assets */}
			{loading && (
				<div className='loading-container'>
					<img src='src/assets/images/loading.gif' alt='Loading' />
				</div>
			)}

			{/* Display error */}
			{error && <div>{error}</div>}

			{/* Show Video */}
			{showVideo && (
				<div className='video-container'>
					<video height='240' controls>
						<source src='src/assets/videos/example 1.mp4' type='video/mp4' />
						Your browser does not support the video tag.
					</video>
				</div>
			)}
		</>
	);
}

export default App;

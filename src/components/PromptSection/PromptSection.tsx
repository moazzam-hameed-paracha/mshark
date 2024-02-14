import React from 'react';
import "./styles.scss";

type propTypes = {
	text: string;
	setText: (text: string) => void;
};

const PromptSection: React.FC<propTypes> = (props) => {
  const { text, setText } = props;

	return (
		<div className='container'>
			<h3>Write a prompt</h3>

			<p>
				Write a prompt for the AI to generate a video. The prompt can be
				anything, but it's recommended to be clear and simple.
			</p>

			<div className='code-example-container'>
				<p>Example:</p>
				<code>x^2 + 2x + 1</code>
			</div>

			<h5>Prompt</h5>
			<textarea
				placeholder='Write a prompt'
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
		</div>
	);
};

export default PromptSection;

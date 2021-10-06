/** @format */

import Select from 'react-select';
import { Controller } from 'react-hook-form';

const GenreInput = ({ control, register, genreOptions, defaultValue }) => {
	return (
		<>
			<Controller
				control={control}
				{...register('genreId')}
				render={({ field }) => (
					<Select
						{...field}
						defaultValue={defaultValue}
						options={genreOptions}
						isLoading={!genreOptions}
					/>
				)}
			/>
		</>
	);
};

export default GenreInput;

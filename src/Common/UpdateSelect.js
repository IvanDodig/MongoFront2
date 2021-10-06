/** @format */

import Select from 'react-select';
import { Controller } from 'react-hook-form';

const UpdateSelect = ({
	control,
	register,
	options,
	defaultValue,
	valueName,
}) => {
	return (
		<>
			<Controller
				control={control}
				{...register(valueName)}
				render={({ field }) => (
					<Select
						{...field}
						defaultValue={defaultValue}
						options={options}
						isLoading={!options}
					/>
				)}
			/>
		</>
	);
};

export default UpdateSelect;



function Option({name, id, isSelected}:OptionProps) {
   
    if (isSelected) {
        return (
            <option selected value={id}>{name}</option>
        );
    }
    return (
        <option value = { id } > { name }</option>
    );
}

interface OptionProps {
    name: string,
    id: string,
    isSelected: boolean
}


export default Option;
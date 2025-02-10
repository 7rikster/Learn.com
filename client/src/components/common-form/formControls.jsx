import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";


function FormControls({formControls=[], formData, setFormData}) {

    function renderComponentByComponentType(getControlItem){
        
        let element = null;
        const currentControlItemValue = formData[getControlItem.name]||"";
        switch (getControlItem.componentType) {
            case 'input':
                element = (<Input
                id={getControlItem.name}
                name={getControlItem.name}
                type={getControlItem.type}
                placeholder={getControlItem.placeholder}
                value={currentControlItemValue}
                onChange = {(event)=>setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}
                />)
                break;
            case 'select':
                element = (<Select
                    onValueChange={(value)=>setFormData({
                        ...formData,
                        [getControlItem.name]:value
                    })}
                    value={currentControlItemValue}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={getControlItem.label}/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length>0 ? 
                            getControlItem.options.map((optionItem)=> <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>):null
                        }
                    </SelectContent>
                </Select>)
                break;
            case 'textArea':
                element = (<Textarea
                id={getControlItem.name}
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                value={currentControlItemValue}
                onChange = {(event)=>setFormData({
                    ...formData,
                    [getControlItem.name] : event.target.value
                })}
                />)
                break;
                
            default:
                element = (<Input
                    id={getControlItem.name}
                    name={getControlItem.name}
                    type={getControlItem.type}
                    placeholder={getControlItem.placeholder}
                    value={currentControlItemValue}
                    onChange = {(event)=>setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })} 
                    />);
                break;

        }
        
        return element;
        
    }
    


    return ( 
        <div className="flex flex-col gap-3">
            {   
                formControls.map((controlItem)=>(
                    <div key={controlItem.name}>
                        <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                        {
                            renderComponentByComponentType(controlItem)

                        }
                    </div>
                ))
            }
        </div>
     );
}

export default FormControls;
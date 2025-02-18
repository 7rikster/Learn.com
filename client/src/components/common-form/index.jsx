import { Button } from "../ui/button";
import FormControls from "./formControls";
import { Toaster } from "../ui/toaster";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>
      <Toaster />
    </form>
  );
}

export default CommonForm;

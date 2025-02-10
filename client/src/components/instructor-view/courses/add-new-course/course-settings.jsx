import MediaProgressBar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";


function CourseSettings() {

    const {courseLandingFormData, setCourseLandingFormData,mediaUploadProgress, setMediaUploadProgress, mediaUploadProgressPercentage, setMediaUploadProgressPercentage} = useContext(InstructorContext); 

    async function handleImageUploadChange(event) {
        const selectedImage = event.target.files[0];

        if(selectedImage){
            const imageFormData = new FormData();
            imageFormData.append("file", selectedImage);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(imageFormData, setMediaUploadProgressPercentage);
                
                if(response.success){
                    setCourseLandingFormData({
                        ...courseLandingFormData,
                        image: response?.data?.url,
                    })
                    console.log(response?.data?.url)
                    setMediaUploadProgress(false);
                }            


            } catch (error) {
                console.log(error);
            }
        }

        

        
    }

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    mediaUploadProgress ? 
                    <MediaProgressBar
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgressPercentage}
                    /> : null
                }

                {
                    courseLandingFormData?.image ? <img src={courseLandingFormData.image}/> : 
                    <div className="flex flex-col gap-3">
                    <Label>Upload course image</Label>
                    <Input onChange={(event)=> handleImageUploadChange(event)} type="file" accept="image/*"/>
                </div>
                }
                
            </CardContent>
        </Card>
     );
}

export default CourseSettings;
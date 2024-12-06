import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const TrackStepper = ({ activeStep }) => {
    // Pasos estáticos sin fechas dinámicas
    const steps = ["Ordered", "Shipped", "Delivered"];

    // Ícono estático para todos los estados
    const icon = <CircleIcon sx={{ fontSize: "16px" }} />;

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((status, index) => (
                <Step key={index} active={activeStep === index} completed={activeStep >= index}>
                    <StepLabel icon={icon}>
                        <span className={activeStep >= index ? "text-primary-green font-medium" : "text-gray-400 font-medium"}>
                            {status}
                        </span>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default TrackStepper;

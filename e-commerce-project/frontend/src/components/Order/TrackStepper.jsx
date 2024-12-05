import { Step, StepLabel, Stepper } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { formatDate } from '../../utils/functions';

const TrackStepper = ({ activeStep, orderCreatedAt, shippedAt, deliveredAt }) => {
    // Array de pasos del seguimiento del pedido
    const steps = [
        {
            status: "Ordered",
            date: formatDate(orderCreatedAt),
        },
        {
            status: "Shipped",
            date: formatDate(shippedAt),
        },
        {
            status: "Delivered",
            date: formatDate(deliveredAt),
        },
    ];

    // Iconos de los pasos (completado y pendiente)
    const completedIcon = (
        <span className="text-primary-green animate-pulse">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );
    const pendingIcon = (
        <span className="text-gray-400">
            <CircleIcon sx={{ fontSize: "16px" }} />
        </span>
    );

    return (
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
                <Step
                    key={index}
                    active={activeStep === index}
                    completed={activeStep >= index}
                >
                    <StepLabel
                        icon={activeStep >= index ? completedIcon : pendingIcon}
                    >
                        {activeStep >= index ? (
                            <div className="flex flex-col">
                                <span className="text-primary-green font-medium">
                                    {step.status}
                                </span>
                                {step.date !== "Invalid Date" && (
                                    <span className="text-primary-green font-medium">
                                        {step.date}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <span className="text-gray-400 font-medium">
                                {step.status}
                            </span>
                        )}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};

export default TrackStepper;

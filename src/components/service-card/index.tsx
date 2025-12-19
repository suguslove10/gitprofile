import { SanitizedService } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';
import {
    SiAmazonwebservices,
    SiTerraform,
    SiKubernetes,
    SiGrafana,
    SiDocker,
    SiAnsible,
    SiPrometheus,
    SiGooglecloud
} from 'react-icons/si';

const iconMap: { [key: string]: React.ElementType } = {
    SiAmazonwebservices,
    SiTerraform,
    SiKubernetes,
    SiGrafana,
    SiDocker,
    SiAnsible,
    SiPrometheus,
    SiGooglecloud,
};

const ServiceCard = ({
    loading,
    header,
    services,
}: {
    loading: boolean;
    header: string;
    services: SanitizedService[];
}) => {
    const renderSkeleton = () => {
        const array = [];
        for (let index = 0; index < 4; index++) {
            array.push(
                <div className="card shadow-lg bg-base-100" key={index}>
                    <div className="card-body p-6 flex flex-row items-start gap-4">
                        {skeleton({ widthCls: 'w-12', heightCls: 'h-12', shape: 'rounded-lg' })}
                        <div className="flex-1">
                            {skeleton({ widthCls: 'w-24', heightCls: 'h-6', className: 'mb-2' })}
                            {skeleton({ widthCls: 'w-full', heightCls: 'h-4', className: 'mb-1' })}
                            {skeleton({ widthCls: 'w-3/4', heightCls: 'h-4' })}
                        </div>
                    </div>
                </div>,
            );
        }
        return array;
    };

    return (
        <div className="col-span-1 lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
                <div className="mx-3">
                    <h5 className="card-title">
                        {loading ? (
                            skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
                        ) : (
                            <span className="text-base-content opacity-70">{header}</span>
                        )}
                    </h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading
                        ? renderSkeleton()
                        : services.map((service, index) => {
                            const Icon = service.icon ? iconMap[service.icon] : null;
                            return (
                                <div key={index} className="card shadow-lg bg-base-100 ServiceCard">
                                    <div className="card-body p-6 flex flex-row items-start gap-4">
                                        <div className="text-primary text-4xl mt-1">
                                            {Icon ? <Icon /> : '🚀'}
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-lg mb-1">{service.title}</h6>
                                            <p className="text-sm opacity-70 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;

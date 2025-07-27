import { LucideProps } from "lucide-react";
import { ComponentType } from "react";



export function InfoCard({title, IconComponent, text} : {title: string, IconComponent: ComponentType<LucideProps>, text: string}){
    return(
        <div className="flex text-md items-start gap-4 p-4 border border-slate-300 rounded-2xl">
          <IconComponent className="w-6 h-6 flex-shrink-0 text-sky-600 mt-1" />
          <div>
            <h3 className="font-semibold text-md text-slate-800">{title}</h3>
            <p className="mt-1 text-slate-600 text-sm">
                {text}
            </p>
          </div>
        </div>
    );
}
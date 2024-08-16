import * as proptypes from "./IconFactory.proptypes";
import * as Icon  from "@icons";

export default function IconFactory({ iconType, fill="#fff" } : proptypes.IconFactoryProps) {

    switch (iconType) {
        
        case "refresh":
            return <Icon.Refresh fill={fill} />
        case "reset":
            return <Icon.Reset fill={fill} />
        case "mic":
            return <Icon.Mic fill={fill} />
        case "stop":
            return <Icon.Stop fill={fill} />
        case "photo":
            return <Icon.Photo fill={fill} />
        
        case "camera":
            return <Icon.Camera fill={fill} />
        
        case "upload_file":
            return <Icon.UploadFileIcon fill={fill} />
        
        case "eye":
          return <Icon.Eye fill={fill}/>

        case "done":
          return <Icon.Done fill={fill} />

        case "arrow_left":
          return <Icon.ArrowLeft fill={fill} />

        case "arrow_right":
          return <Icon.ArrowRight fill={fill} />

        case "arrow_down":
          return <Icon.ArrowDown fill={fill} />

        case "arrow_up":
          return <Icon.ArrowUp fill={fill} />

        case "home":
          return <Icon.Home fill={fill} />

        case "cotizar":
          return <Icon.Cotizar fill={fill} />

        case "emision":
          return <Icon.Emision fill={fill} />

        case "suscripciones":
          return <Icon.Suscripciones fill={fill} />

        case "reportes":
          return <Icon.Reportes fill={fill} />

        case "modulo":
          return <Icon.Modulo fill={fill} />

        case "calendario":
          return <Icon.Calendario fill={fill} />

        case "hora":
          return <Icon.Hora fill={fill} />

        case "user_peak":
          return <Icon.UserPeak fill={fill} />

        case "close":
          return <Icon.Close fill={fill} />

        case "done_circle":
          return <Icon.DoneCircle fill={fill} />

        case "dependientes":
          return <Icon.Dependientes fill={fill} />
        
        case "tci_electronico":
          return <Icon.TCIElectronico fill={fill} />

        case "checkbox_on":
          return <Icon.CheckBoxON fill={fill} />

        case "checkbox_off":
          return <Icon.CheckBoxOFF fill={fill} />
        
        case "download":
          return <Icon.Download fill={fill} />

        case "impresion":
          return <Icon.Impresion fill={fill} />

        case "search":
          return <Icon.Search fill={fill} />
        
        case "description":
          return <Icon.Description fill={fill} />

        case "edit":
          return <Icon.Editar fill={fill} />

        case "info":
          return <Icon.Info fill={fill} />

        case "deportes":
          return <Icon.Deportes fill={fill} />

        case "medicina":
          return <Icon.Medicina fill={fill} />
        
        case "toggle_on":
          return <Icon.ToggleON fill={fill} />

        case "toggle_off":
          return <Icon.ToggleOFF fill={fill} />

        case "eye_on":
          return <Icon.EyeON fill={fill} />
        
        case "eye_off":
          return <Icon.EyeOFF fill={fill} />
        
        default:
          return null;    
      }

}
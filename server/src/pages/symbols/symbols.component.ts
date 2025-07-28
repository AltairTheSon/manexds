import { Component } from '@angular/core';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.scss']
})
export class SymbolsComponent {
  // Page properties extracted from Figma
  readonly pageData = {
    name: 'Symbols',
    children: [
  {
    "id": "0:91",
    "name": "other/vehicle-plate",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 120,
      "height": 21,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:96",
    "name": "other/alerts/info-with-link",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 110,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "paddingLeft": 8,
      "paddingRight": 4,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "0:105",
    "name": "other/alerts/mini-error",
    "type": "COMPONENT",
    "variants": [
      "icons/alert"
    ],
    "properties": {
      "width": 63,
      "height": 39,
      "fills": [
        {
          "opacity": 0.07999999821186066,
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9019607901573181,
            "g": 0.3176470696926117,
            "b": 0.3176470696926117,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.13475196063518524
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 2
          },
          "radius": 6,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 6,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 13,
      "paddingBottom": 13
    }
  },
  {
    "id": "0:109",
    "name": "other/alerts/mini-heads-up",
    "type": "COMPONENT",
    "variants": [
      "icons/information"
    ],
    "properties": {
      "width": 63,
      "height": 39,
      "fills": [
        {
          "opacity": 0.07999999821186066,
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 0.6745098233222961,
            "b": 0.22745098173618317,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.13475196063518524
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 2
          },
          "radius": 6,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 6,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 13,
      "paddingBottom": 13
    }
  },
  {
    "id": "0:113",
    "name": "other/alerts/mini-success",
    "type": "COMPONENT",
    "variants": [
      "icons/check"
    ],
    "properties": {
      "width": 63,
      "height": 39,
      "fills": [
        {
          "opacity": 0.07999999821186066,
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.1568627506494522,
            "g": 0.7450980544090271,
            "b": 0.5372549295425415,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.13475196063518524
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 2
          },
          "radius": 6,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 6,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 13,
      "paddingBottom": 13
    }
  },
  {
    "id": "4244:42325",
    "name": "tooltips/arrow-up/default-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 84,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42401",
    "name": "tooltips/arrow-up/default-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6839",
    "name": "tooltips/arrow-down/default-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42472",
    "name": "tooltips/arrow-up/heads-up-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 84,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6843",
    "name": "tooltips/arrow-down/heads-up-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 84,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42473",
    "name": "tooltips/arrow-up/heads-up-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6842",
    "name": "tooltips/arrow-down/heads-up-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42521",
    "name": "tooltips/arrow-up/warning-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 84,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6840",
    "name": "tooltips/arrow-down/warning-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 84,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:146",
    "name": "other/components-title",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 409,
      "height": 104,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:150",
    "name": "other/divider",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1366,
      "height": 1,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:152",
    "name": "other/cover",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1366,
      "height": 768,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5330:3678",
    "name": "other/sub-cover",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1366,
      "height": 768,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:161",
    "name": "logos/sss-en-omega",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 255,
      "height": 81,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:202",
    "name": "logos/sss-en-multi-color",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 255,
      "height": 81,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "7272:3982",
    "name": "logos/sss-ar-multi-color",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 255,
      "height": 81,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "7272:3981",
    "name": "logos/sss-ar-omega",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 255,
      "height": 81,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:243",
    "name": "logos/manex-ar-omega",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:261",
    "name": "logos/manex-ar-alpha",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:279",
    "name": "logos/manex-en-multi-color",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4838:3230",
    "name": "logos/manex-en-alpha",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4838:3281",
    "name": "logos/manex-en-omega",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:304",
    "name": "logos/manex-ar-multi-color",
    "type": "COMPONENT",
    "variants": [
      "icons/manex"
    ],
    "properties": {
      "width": 258,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:352",
    "name": "tables/scroll-bar-vertical",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 12,
      "height": 600,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:355",
    "name": "tables/scroll-bar-horizontal ",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1068,
      "height": 12,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:379",
    "name": "tables/icon-cell",
    "type": "COMPONENT",
    "variants": [
      "icons/overflow-menu"
    ],
    "properties": {
      "width": 44,
      "height": 44,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 4
    }
  },
  {
    "id": "0:390",
    "name": "tables/policy-usage-spent-and-planned",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 68,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "0:404",
    "name": "tables/policy-usage-table",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 200,
      "height": 75,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4002:2577",
    "name": "cards/policy-usage",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 336,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:696",
    "name": "dropdowns/drop-menu-for-link",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right",
      "buttons/text/ray-right"
    ],
    "properties": {
      "width": 230,
      "height": 486,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:709",
    "name": "dropdowns/drop-menu-with-multi-actions",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "other/divider",
      "buttons/text/positive-with-right-icon",
      "buttons/text/negative-with-right-icon",
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 889,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 14,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "0:732",
    "name": "dropdowns/drop-menu-with-icons",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon",
      "buttons/text/primary-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 906,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "0:755",
    "name": "dropdowns/drop-menu-with-checkboxes",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon",
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 270,
      "height": 906,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:778",
    "name": "dropdowns/drop-menu",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right",
      "buttons/text/legend-right"
    ],
    "properties": {
      "width": 270,
      "height": 906,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 14,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "0:801",
    "name": "dropdowns/selection-with-label-active",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 155,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:806",
    "name": "dropdowns/selection-with-label-inactive",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 155,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:811",
    "name": "dropdowns/selection-no-label-active",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 155,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:815",
    "name": "dropdowns/selection-no-label-inactive",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 155,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 8,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "5257:3431",
    "name": "dropdowns/selection-with-icon-no-label-inactive",
    "type": "COMPONENT",
    "variants": [
      "icons/calendar"
    ],
    "properties": {
      "width": 155,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 8,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:819",
    "name": "dropdowns/label",
    "type": "COMPONENT",
    "variants": [
      "icons/list-en"
    ],
    "properties": {
      "width": 47,
      "height": 14,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:822",
    "name": "dropdowns/section-expand-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:827",
    "name": "dropdowns/section-expand-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 86,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 8,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:832",
    "name": "inputs/active/with-fixed-value-tag",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:876",
    "name": "inputs/active/dropdown-type-2",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 152,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:886",
    "name": "inputs/active/dropdown-type-1",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:904",
    "name": "inputs/active/type-2-with-icon",
    "type": "COMPONENT",
    "variants": [
      "icons/calendar"
    ],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:923",
    "name": "buttons/text/negative-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:927",
    "name": "buttons/text/negative-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:931",
    "name": "buttons/text/negative-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:933",
    "name": "buttons/text/negative-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:935",
    "name": "buttons/text/negative-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:937",
    "name": "buttons/text/positive-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:941",
    "name": "buttons/text/positive-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:945",
    "name": "buttons/text/positive-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:947",
    "name": "buttons/text/positive-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:949",
    "name": "buttons/text/positive-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:951",
    "name": "buttons/text/omega-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:955",
    "name": "buttons/text/omega-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:959",
    "name": "buttons/text/omega-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:961",
    "name": "buttons/text/omega-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:963",
    "name": "buttons/text/omega-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:965",
    "name": "buttons/text/ray-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32606",
    "name": "buttons/text/misty-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:969",
    "name": "buttons/text/ray-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:973",
    "name": "buttons/text/ray-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:975",
    "name": "buttons/text/ray-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:977",
    "name": "buttons/text/ray-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:979",
    "name": "buttons/text/legend-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4144:5390",
    "name": "buttons/text/legend-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32629",
    "name": "buttons/text/misty-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10736",
    "name": "buttons/text/ray-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10735",
    "name": "buttons/text/primary-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10737",
    "name": "buttons/text/omega-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10738",
    "name": "buttons/text/positive-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10739",
    "name": "buttons/text/negative-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:983",
    "name": "buttons/text/legend-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32644",
    "name": "buttons/text/misty-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:987",
    "name": "buttons/text/legend-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:989",
    "name": "buttons/text/legend-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:991",
    "name": "buttons/text/legend-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32657",
    "name": "buttons/text/misty-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32658",
    "name": "buttons/text/misty-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4215:32659",
    "name": "buttons/text/misty-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2922",
    "name": "buttons/text/light-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2923",
    "name": "buttons/text/light-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2921",
    "name": "buttons/text/light-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2920",
    "name": "buttons/text/light-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2919",
    "name": "buttons/text/light-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4439:2918",
    "name": "buttons/text/light-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10634",
    "name": "buttons/text/alpha-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10635",
    "name": "buttons/text/alpha-with-both-sides-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 72,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10633",
    "name": "buttons/text/alpha-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10632",
    "name": "buttons/text/alpha-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10631",
    "name": "buttons/text/alpha-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4164:10630",
    "name": "buttons/text/alpha-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:993",
    "name": "buttons/text/primary-with-right-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:997",
    "name": "buttons/text/primary-with-left-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 56,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1001",
    "name": "buttons/text/primary-right",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1003",
    "name": "buttons/text/primary-left",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1005",
    "name": "buttons/text/primary-center",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 36,
      "height": 18,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1023",
    "name": "buttons/multi-actions/type-2",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-right-icon",
      "other/divider",
      "buttons/text/primary-with-right-icon"
    ],
    "properties": {
      "width": 209,
      "height": 40,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0,
            "g": 0.27135103940963745,
            "b": 0.6766601800918579,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24
    }
  },
  {
    "id": "0:1028",
    "name": "buttons/multi-actions/type-1",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/negative-with-right-icon",
      "other/divider",
      "buttons/text/positive-with-right-icon"
    ],
    "properties": {
      "width": 213,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24
    }
  },
  {
    "id": "0:1033",
    "name": "buttons/outlined/negative-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/negative-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1038",
    "name": "buttons/outlined/negative-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/negative-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.901749312877655,
            "g": 0.31774502992630005,
            "b": 0.31774502992630005,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1041",
    "name": "buttons/outlined/negative-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/negative-with-left-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.901749312877655,
            "g": 0.31774502992630005,
            "b": 0.31774502992630005,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1044",
    "name": "buttons/outlined/negative",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/negative-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1047",
    "name": "buttons/outlined/positive-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/positive-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1052",
    "name": "buttons/outlined/positive-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/positive-with-right-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1055",
    "name": "buttons/outlined/positive-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/positive-with-left-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1058",
    "name": "buttons/outlined/positive",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/positive-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1061",
    "name": "buttons/outlined/legend-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1066",
    "name": "buttons/outlined/legend-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.3875436782836914,
            "g": 0.4096220135688782,
            "b": 0.534732460975647,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1069",
    "name": "buttons/outlined/legend-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-left-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1072",
    "name": "buttons/outlined/legend",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1075",
    "name": "buttons/outlined/primary-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/primary-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1080",
    "name": "buttons/outlined/primary-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1083",
    "name": "buttons/outlined/primary-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-left-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0,
            "g": 0.27135103940963745,
            "b": 0.6766601800918579,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1086",
    "name": "buttons/outlined/primary",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1089",
    "name": "buttons/filled/negative-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/omega-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1094",
    "name": "buttons/filled/negative-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1097",
    "name": "buttons/filled/negative-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-left-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.901749312877655,
            "g": 0.31774502992630005,
            "b": 0.31774502992630005,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1100",
    "name": "buttons/filled/negative",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1103",
    "name": "buttons/filled/positive-dropdown",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-right"
    ],
    "properties": {
      "width": 108,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.15726026892662048,
            "g": 0.7457823753356934,
            "b": 0.536372184753418,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24
    }
  },
  {
    "id": "0:1108",
    "name": "buttons/filled/positive-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1111",
    "name": "buttons/filled/positive-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-left-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.15726026892662048,
            "g": 0.7457823753356934,
            "b": 0.536372184753418,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1114",
    "name": "buttons/filled/positive",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.15726026892662048,
            "g": 0.7457823753356934,
            "b": 0.536372184753418,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 10,
      "paddingBottom": 10
    }
  },
  {
    "id": "0:1117",
    "name": "buttons/filled/light-dropdown",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1122",
    "name": "buttons/filled/light-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4939:3452",
    "name": "icons/qr-scan",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1125",
    "name": "buttons/filled/light-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-left-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1128",
    "name": "buttons/filled/light",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4350:2874",
    "name": "buttons/filled/omega-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "4350:2873",
    "name": "buttons/filled/omega-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-left-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4350:2872",
    "name": "buttons/filled/omega",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "4351:2957",
    "name": "buttons/filled/haze-dropdown",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-2",
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 98,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4351:2956",
    "name": "buttons/filled/haze-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "4351:2955",
    "name": "buttons/filled/haze-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-left-icon"
    ],
    "properties": {
      "width": 106,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4351:2954",
    "name": "buttons/filled/haze",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1131",
    "name": "buttons/filled/primary-dropdown",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-right"
    ],
    "properties": {
      "width": 108,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0,
            "g": 0.27135103940963745,
            "b": 0.6766601800918579,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24
    }
  },
  {
    "id": "5125:4106",
    "name": "buttons/filled/omega-dropdown",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-right"
    ],
    "properties": {
      "width": 108,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24
    }
  },
  {
    "id": "0:1136",
    "name": "buttons/filled/primary-with-right-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-right-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1139",
    "name": "buttons/filled/primary-with-left-icon",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-with-left-icon"
    ],
    "properties": {
      "width": 104,
      "height": 40,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0,
            "g": 0.27135103940963745,
            "b": 0.6766601800918579,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1142",
    "name": "buttons/filled/primary",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/omega-center"
    ],
    "properties": {
      "width": 84,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 11,
      "paddingBottom": 11
    }
  },
  {
    "id": "0:1146",
    "name": "navigation/counter",
    "type": "COMPONENT",
    "variants": [
      "buttons/filled/positive"
    ],
    "properties": {
      "width": 176,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1199",
    "name": "navigation/tags/info-type-3",
    "type": "COMPONENT",
    "variants": [
      "navigation/tags/info-type-2"
    ],
    "properties": {
      "width": 83,
      "height": 21,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1202",
    "name": "navigation/tags/info-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 35,
      "height": 21,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 4,
      "paddingRight": 4,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "4189:32928",
    "name": "navigation/tags/info-type-4",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 136,
      "height": 29,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 8,
      "paddingBottom": 8
    }
  },
  {
    "id": "0:1205",
    "name": "navigation/tags/info-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 35,
      "height": 21,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 4,
      "paddingRight": 4,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "0:1208",
    "name": "navigation/tags/active/type-3",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 89,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14
    }
  },
  {
    "id": "0:1213",
    "name": "navigation/tags/inactive/type-3",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 88,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14
    }
  },
  {
    "id": "0:1218",
    "name": "navigation/tags/active/type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 80,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 8,
      "paddingBottom": 8
    }
  },
  {
    "id": "0:1223",
    "name": "navigation/tags/inactive/type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 80,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 8,
      "paddingBottom": 8
    }
  },
  {
    "id": "0:1228",
    "name": "navigation/tags/active/type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 60,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 8,
      "paddingBottom": 8
    }
  },
  {
    "id": "0:1231",
    "name": "navigation/tags/inactive/type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 60,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 8,
      "paddingBottom": 8
    }
  },
  {
    "id": "0:1234",
    "name": "navigation/double-tab-item-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 194,
      "height": 42,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1294",
    "name": "navigation/side-menu-item-type-1",
    "type": "COMPONENT",
    "variants": [
      "icons/home",
      "icons/arrow-right-type-1"
    ],
    "properties": {
      "width": 214,
      "height": 38,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1303",
    "name": "navigation/corporate/side-menu-collapsed",
    "type": "COMPONENT",
    "variants": [
      "other/divider",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home copy",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "logos/manex-ar-multi-color"
    ],
    "properties": {
      "width": 72,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4854:4134",
    "name": "navigation/merchant/side-menu-collapsed",
    "type": "COMPONENT",
    "variants": [
      "other/divider",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home copy",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "logos/manex-ar-multi-color"
    ],
    "properties": {
      "width": 72,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4293:25588",
    "name": "navigation/sss-admin/side-menu-collapsed",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-ar-multi-color",
      "other/divider",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home copy",
      "icons/home",
      "icons/home",
      "icons/home",
      "icons/home"
    ],
    "properties": {
      "width": 72,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1327",
    "name": "navigation/corporate/side-menu-expanded-dropdown",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-ar-multi-color",
      "navigation/side-menu-item",
      "navigation/side-menu-item",
      "navigation/side-menu-item copy",
      "navigation/side-menu-item"
    ],
    "properties": {
      "width": 262,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 24,
          "showShadowBehindNode": false
        }
      ]
    }
  },
  {
    "id": "0:1366",
    "name": "navigation/corporate/side-menu-expanded",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-ar-multi-color",
      "other/divider",
      "logos/sss-en-multi-color",
      "navigation/side-menu-item",
      "navigation/side-menu-item",
      "navigation/side-menu-item copy 4",
      "navigation/side-menu-item copy 10",
      "navigation/side-menu-item copy",
      "navigation/side-menu-item copy 2",
      "navigation/side-menu-item copy 3",
      "navigation/side-menu-item"
    ],
    "properties": {
      "width": 262,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4854:4019",
    "name": "navigation/merchant/side-menu-expanded",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-ar-multi-color",
      "other/divider",
      "logos/sss-en-multi-color",
      "navigation/side-menu-item",
      "navigation/side-menu-item",
      "navigation/side-menu-item copy 4",
      "navigation/side-menu-item copy 10",
      "navigation/side-menu-item copy",
      "navigation/side-menu-item copy 2",
      "navigation/side-menu-item copy 3",
      "navigation/side-menu-item"
    ],
    "properties": {
      "width": 262,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1407",
    "name": "icons/gift",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1415",
    "name": "icons/percentage",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1423",
    "name": "icons/equipment",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1431",
    "name": "icons/merchants",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1437",
    "name": "icons/bank",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1448",
    "name": "icons/more",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1469",
    "name": "icons/engine",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4360:2841",
    "name": "icons/settings",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1482",
    "name": "icons/gauge",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1487",
    "name": "icons/oil",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1494",
    "name": "icons/dynamic-policy",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1501",
    "name": "icons/distance-reading",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1507",
    "name": "icons/distance",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1513",
    "name": "icons/fuel",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1525",
    "name": "icons/tank-capacity",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1531",
    "name": "icons/link",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1536",
    "name": "icons/user",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1543",
    "name": "icons/repeat",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1546",
    "name": "icons/one-time",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1551",
    "name": "icons/layout",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1559",
    "name": "icons/table",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1567",
    "name": "icons/donut-chart-down",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1574",
    "name": "icons/donut-chart-up",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1581",
    "name": "icons/donut-chart",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1587",
    "name": "icons/gas-pump",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1593",
    "name": "icons/save",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1599",
    "name": "icons/delete",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1607",
    "name": "icons/calendar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1613",
    "name": "icons/radio-button-active",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1619",
    "name": "icons/radio-button-inactive",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1624",
    "name": "icons/suspend",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1630",
    "name": "icons/question-mark-ar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1637",
    "name": "icons/transfer-money",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1644",
    "name": "icons/bar-chart",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1653",
    "name": "icons/balance-type",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4290:3665",
    "name": "icons/share",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1660",
    "name": "icons/tree-en",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1667",
    "name": "icons/tree-ar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1674",
    "name": "icons/expand",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1679",
    "name": "icons/collapse",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1684",
    "name": "icons/calculator",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1695",
    "name": "icons/invoice",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1703",
    "name": "icons/pie-chart",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1709",
    "name": "icons/sort-descending",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1716",
    "name": "icons/sort-ascending",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1723",
    "name": "icons/search",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1729",
    "name": "icons/language",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1739",
    "name": "icons/menu",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1745",
    "name": "icons/manex-gauge",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1752",
    "name": "icons/edit",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1758",
    "name": "icons/placeholder",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1766",
    "name": "icons/location",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4373:6455",
    "name": "icons/location-filled-for-maps",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1779",
    "name": "icons/pending-requests",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1786",
    "name": "icons/list-en",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1797",
    "name": "icons/list-ar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1808",
    "name": "icons/attachments",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1811",
    "name": "icons/reports",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1817",
    "name": "icons/notifications",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1823",
    "name": "icons/billing-account",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1829",
    "name": "icons/policies",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1836",
    "name": "icons/contacts",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1846",
    "name": "icons/information",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1853",
    "name": "icons/add",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1859",
    "name": "icons/manex",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1865",
    "name": "icons/alert",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1872",
    "name": "icons/user-card",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1885",
    "name": "icons/branch",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1892",
    "name": "icons/overflow-menu",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1898",
    "name": "icons/hour-glass",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1904",
    "name": "icons/reprint",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1909",
    "name": "icons/printer",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1917",
    "name": "icons/upload",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1922",
    "name": "icons/hashtag",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1927",
    "name": "icons/filter",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1936",
    "name": "icons/copy",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1942",
    "name": "icons/close",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1948",
    "name": "icons/check",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1954",
    "name": "icons/requested-cards",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1961",
    "name": "icons/checkbox-active",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1966",
    "name": "icons/checkbox-partially-selected",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1972",
    "name": "icons/checkbox-inactive",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1977",
    "name": "icons/transactions",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1984",
    "name": "icons/exchange",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1989",
    "name": "icons/admin",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1996",
    "name": "icons/user-management",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2005",
    "name": "icons/master-corporate",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2011",
    "name": "icons/corporates",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2018",
    "name": "icons/truck",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2026",
    "name": "icons/home",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2031",
    "name": "icons/arrow-down-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2037",
    "name": "icons/arrow-up-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2043",
    "name": "icons/arrow-left-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2049",
    "name": "icons/arrow-right-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2055",
    "name": "icons/arrow-down-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2058",
    "name": "icons/arrow-up-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2061",
    "name": "icons/arrow-left-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2064",
    "name": "icons/arrow-right-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2067",
    "name": "icons/uk-flag",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:2079",
    "name": "icons/egypt-flag",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5065:3502",
    "name": "colors/gradient/5/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3500",
    "name": "colors/gradient/5/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3499",
    "name": "colors/gradient/5/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3501",
    "name": "colors/gradient/5/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3498",
    "name": "colors/gradient/5/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3497",
    "name": "colors/gradient/5/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "5065:3496",
    "name": "colors/gradient/5/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2107",
    "name": "colors/gradient/2/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24681",
    "name": "colors/gradient/3/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24688",
    "name": "colors/gradient/4/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2866",
    "name": "colors/gradient/4/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2865",
    "name": "colors/gradient/4/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2864",
    "name": "colors/gradient/4/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2863",
    "name": "colors/gradient/4/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2862",
    "name": "colors/gradient/4/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4429:2861",
    "name": "colors/gradient/4/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24683",
    "name": "colors/gradient/3/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24682",
    "name": "colors/gradient/3/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24680",
    "name": "colors/gradient/3/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24679",
    "name": "colors/gradient/3/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24678",
    "name": "colors/gradient/3/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "4373:24677",
    "name": "colors/gradient/3/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2109",
    "name": "colors/gradient/1/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1774",
    "name": "colors/gradient/1/ 64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2111",
    "name": "colors/solid/12.negative",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2113",
    "name": "colors/solid/11.positive",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4435",
    "name": "colors/gradient/6/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3877",
    "name": "colors/gradient/7/100%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2115",
    "name": "colors/solid/10.secondary-two",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2117",
    "name": "colors/solid/9.secondary",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2119",
    "name": "colors/solid/8.omega",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2121",
    "name": "colors/solid/7.haze",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2123",
    "name": "colors/solid/6.ray",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2125",
    "name": "colors/solid/5.light",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2127",
    "name": "colors/solid/4.misty",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2129",
    "name": "colors/solid/3.legend",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2131",
    "name": "colors/solid/2.alpha",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:2133",
    "name": "colors/solid/1.primary",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2284",
    "name": "colors/solid/1.primary/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2285",
    "name": "colors/solid/1.primary/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2286",
    "name": "colors/solid/1.primary/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2287",
    "name": "colors/solid/1.primary/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2288",
    "name": "colors/solid/1.primary/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2289",
    "name": "colors/solid/1.primary/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2290",
    "name": "colors/solid/2.alpha/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2291",
    "name": "colors/solid/2.alpha/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2292",
    "name": "colors/solid/2.alpha/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2293",
    "name": "colors/solid/2.alpha/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2294",
    "name": "colors/solid/2.alpha/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2295",
    "name": "colors/solid/2.alpha/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2296",
    "name": "colors/solid/3.legend/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2297",
    "name": "colors/solid/3.legend/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2298",
    "name": "colors/solid/3.legend/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2299",
    "name": "colors/solid/3.legend/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2300",
    "name": "colors/solid/3.legend/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2301",
    "name": "colors/solid/3.legend/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2302",
    "name": "colors/solid/4.misty/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2303",
    "name": "colors/solid/4.misty/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2304",
    "name": "colors/solid/4.misty/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2305",
    "name": "colors/solid/4.misty/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2306",
    "name": "colors/solid/4.misty/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2307",
    "name": "colors/solid/4.misty/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2361",
    "name": "colors/solid/5.light/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2362",
    "name": "colors/solid/5.light/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2364",
    "name": "colors/solid/5.light/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2366",
    "name": "colors/solid/5.light/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [
        {
          "opacity": 0.14000000059604645,
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.38823530077934265,
            "g": 0.40784314274787903,
            "b": 0.5333333611488342,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2365",
    "name": "colors/solid/5.light/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2363",
    "name": "colors/solid/5.light/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2378",
    "name": "colors/solid/6.ray/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2379",
    "name": "colors/solid/6.ray/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2381",
    "name": "colors/solid/6.ray/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2383",
    "name": "colors/solid/6.ray/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2382",
    "name": "colors/solid/6.ray/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2380",
    "name": "colors/solid/6.ray/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2392",
    "name": "colors/solid/7.haze/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2393",
    "name": "colors/solid/7.haze/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2395",
    "name": "colors/solid/7.haze/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2397",
    "name": "colors/solid/7.haze/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2396",
    "name": "colors/solid/7.haze/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2394",
    "name": "colors/solid/7.haze/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2408",
    "name": "colors/solid/8.omega/64",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2409",
    "name": "colors/solid/8.omega/44",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2411",
    "name": "colors/solid/8.omega/24",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2413",
    "name": "colors/solid/8.omega/8",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2412",
    "name": "colors/solid/8.omega/14",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2047:2410",
    "name": "colors/solid/8.omega/34",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1652",
    "name": "colors/solid/9.secondary/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1653",
    "name": "colors/solid/9.secondary/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1654",
    "name": "colors/solid/9.secondary/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1655",
    "name": "colors/solid/9.secondary/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1656",
    "name": "colors/solid/9.secondary/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1657",
    "name": "colors/solid/9.secondary/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1676",
    "name": "colors/solid/10.secondary-two/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1677",
    "name": "colors/solid/10.secondary-two/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1678",
    "name": "colors/solid/10.secondary-two/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1679",
    "name": "colors/solid/10.secondary-two/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1680",
    "name": "colors/solid/10.secondary-two/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1681",
    "name": "colors/solid/10.secondary-two/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1689",
    "name": "colors/solid/11.positive/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4434",
    "name": "colors/gradient/6/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3876",
    "name": "colors/gradient/7/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1690",
    "name": "colors/solid/11.positive/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4432",
    "name": "colors/gradient/6/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3874",
    "name": "colors/gradient/7/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1691",
    "name": "colors/solid/11.positive/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4431",
    "name": "colors/gradient/6/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3873",
    "name": "colors/gradient/7/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1692",
    "name": "colors/solid/11.positive/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4430",
    "name": "colors/gradient/6/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3875",
    "name": "colors/gradient/7/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1693",
    "name": "colors/solid/11.positive/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4433",
    "name": "colors/gradient/6/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3872",
    "name": "colors/gradient/7/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1696",
    "name": "colors/solid/11.positive/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6034:4429",
    "name": "colors/gradient/6/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "6857:3871",
    "name": "colors/gradient/7/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1703",
    "name": "colors/solid/12.negative/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1704",
    "name": "colors/solid/12.negative/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1705",
    "name": "colors/solid/12.negative/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1706",
    "name": "colors/solid/12.negative/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1707",
    "name": "colors/solid/12.negative/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1708",
    "name": "colors/solid/12.negative/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1775",
    "name": "colors/gradient/1/ 44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1776",
    "name": "colors/gradient/1/ 34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1777",
    "name": "colors/gradient/1/ 24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2048:1778",
    "name": "colors/gradient/1/ 14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2064:2237",
    "name": "colors/gradient/1/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1791",
    "name": "colors/gradient/2/64%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1792",
    "name": "colors/gradient/2/44%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1793",
    "name": "colors/gradient/2/34%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1794",
    "name": "colors/gradient/2/24%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1795",
    "name": "colors/gradient/2/14%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "2049:1796",
    "name": "colors/gradient/2/8%",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 14
    }
  },
  {
    "id": "0:1264",
    "name": "navigation/pagination",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1252",
    "name": "navigation/pagination-with-page-jump",
    "type": "COMPONENT",
    "variants": [
      "navigation/pagination"
    ],
    "properties": {
      "width": 984,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1007",
    "name": "buttons/action-view-active",
    "type": "COMPONENT",
    "variants": [
      "icons/list-ar"
    ],
    "properties": {
      "width": 40,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1010",
    "name": "buttons/action-inactive",
    "type": "COMPONENT",
    "variants": [
      "icons/list-ar"
    ],
    "properties": {
      "width": 40,
      "height": 40,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1013",
    "name": "buttons/overflow-menu",
    "type": "COMPONENT",
    "variants": [
      "icons/overflow-menu"
    ],
    "properties": {
      "width": 34,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:689",
    "name": "cards/printing-agency",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 54,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:672",
    "name": "cards/printing-order-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 150,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:646",
    "name": "cards/printing-order-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 272,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4165:11360",
    "name": "navigation/alert-type-2",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-right"
    ],
    "properties": {
      "width": 1032,
      "height": 68,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.11349978297948837
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 8
    }
  },
  {
    "id": "0:638",
    "name": "cards/card-holder",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/primary-with-right-icon",
      "navigation/tags/info-type-2"
    ],
    "properties": {
      "width": 504,
      "height": 80,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:605",
    "name": "cards/pending-request",
    "type": "COMPONENT",
    "variants": [
      "buttons/multi-actions/icons-only-type-1",
      "icons/checkbox-inactive"
    ],
    "properties": {
      "width": 1032,
      "height": 128,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:594",
    "name": "cards/mother-ou",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 121,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:581",
    "name": "cards/main-ou",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 120,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:568",
    "name": "cards/sub-ou",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 96,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:499",
    "name": "cards/policy-asset-usage",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 458,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:490",
    "name": "cards/asset-stats-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 111,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.11349978297948837
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": true
        }
      ]
    }
  },
  {
    "id": "0:484",
    "name": "cards/asset-stats--type-1-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 106,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.11349978297948837
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": true
        }
      ],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "0:1016",
    "name": "buttons/multi-actions/icons-only-type-1",
    "type": "COMPONENT",
    "variants": [
      "icons/view"
    ],
    "properties": {
      "width": 152,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4174:18023",
    "name": "buttons/multi-actions/icons-only-type-2",
    "type": "COMPONENT",
    "variants": [
      "icons/edit",
      "other/divider",
      "icons/view"
    ],
    "properties": {
      "width": 122,
      "height": 32,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9333333373069763,
            "g": 0.9333333373069763,
            "b": 0.9490196108818054,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.08823207765817642
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 2,
            "y": 2
          },
          "radius": 5,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 2000,
      "paddingLeft": 24,
      "paddingRight": 24
    }
  },
  {
    "id": "0:334",
    "name": "popups/standard-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 293,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.5920000076293945,
            "g": 0.5920000076293945,
            "b": 0.5920000076293945,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.23999999463558197
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 44,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 24,
      "paddingLeft": 34,
      "paddingRight": 34,
      "paddingTop": 34,
      "paddingBottom": 34
    }
  },
  {
    "id": "0:344",
    "name": "popups/standard-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 190,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:323",
    "name": "popups/standard-with-dropdown-and-input",
    "type": "COMPONENT",
    "variants": [
      "inputs/inactive/dropdown-type-1"
    ],
    "properties": {
      "width": 416,
      "height": 506,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:117",
    "name": "other/alerts/error",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-left",
      "icons/alert"
    ],
    "properties": {
      "width": 416,
      "height": 66,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:123",
    "name": "other/alerts/heads-up",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-left",
      "icons/information"
    ],
    "properties": {
      "width": 416,
      "height": 66,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:129",
    "name": "other/alerts/success",
    "type": "COMPONENT",
    "variants": [
      "icons/check"
    ],
    "properties": {
      "width": 416,
      "height": 66,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 24,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 12,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "0:414",
    "name": "lists/asset-alert-type-1",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1",
      "other/divider",
      "icons/gas-pump"
    ],
    "properties": {
      "width": 1032,
      "height": 93,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:438",
    "name": "lists/ou-list",
    "type": "COMPONENT",
    "variants": [
      "buttons/overflow-menu",
      "other/divider",
      "icons/arrow-down-type-1",
      "other/divider"
    ],
    "properties": {
      "width": 1032,
      "height": 93,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4160:11734",
    "name": "lists/ou-sub-tree-medium",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 294,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:460",
    "name": "lists/ou-sub-tree",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 34,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 8
    }
  },
  {
    "id": "4176:20367",
    "name": "lists/ou-sub-tree-medium-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 336,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:466",
    "name": "lists/ou-tree",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 34,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0,
            "g": 0.27135103940963745,
            "b": 0.6766601800918579,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 8
    }
  },
  {
    "id": "0:470",
    "name": "lists/pending-request-changes",
    "type": "COMPONENT",
    "variants": [
      "other/divider",
      "icons/arrow-left-type-2"
    ],
    "properties": {
      "width": 504,
      "height": 85,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1396",
    "name": "navigation/header",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1032,
      "height": 32,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:1153",
    "name": "navigation/info-breadcrumbs-type-2",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-left-type-2",
      "icons/arrow-left-type-2",
      "icons/arrow-left-type-2",
      "navigation/tags/info-type-1",
      "other/vehicle-plate"
    ],
    "properties": {
      "width": 1032,
      "height": 49,
      "fills": [],
      "strokes": [],
      "effects": [],
      "cornerRadius": 8
    }
  },
  {
    "id": "0:1162",
    "name": "navigation/info-breadcrumbs-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1032,
      "height": 44,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "0:1182",
    "name": "navigation/page-header-section",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1032,
      "height": 89,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "0:838",
    "name": "inputs/inactive/with-fixed-value-tag",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:914",
    "name": "inputs/active/type-1-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:909",
    "name": "inputs/inactive/type-2-with-icon",
    "type": "COMPONENT",
    "variants": [
      "icons/calendar"
    ],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:891",
    "name": "inputs/inactive/dropdown-type-1",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 240,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:900",
    "name": "inputs/inactive/type-3-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 152,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:896",
    "name": "inputs/active/type-3-no-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 152,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:881",
    "name": "inputs/inactive/dropdown-type-2",
    "type": "COMPONENT",
    "variants": [
      "icons/arrow-down-type-1"
    ],
    "properties": {
      "width": 152,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4004:2558",
    "name": "inputs/inactive/linked-inputs",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 329,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "0:844",
    "name": "inputs/active/linked-inputs",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 329,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42522",
    "name": "tooltips/arrow-up/warning-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6838",
    "name": "tooltips/arrow-down/warning-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 104,
      "height": 55,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4103:2728",
    "name": "other/loading-spinner",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 100,
      "height": 100,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4104:3675",
    "name": "other/badges/success/no-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 16,
      "height": 16,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4104:3677",
    "name": "other/badges/notification/no-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 16,
      "height": 16,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4104:3679",
    "name": "other/badges/heads-up/no-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 16,
      "height": 16,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4104:3678",
    "name": "other/badges/notification/with-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 35,
      "height": 21,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 0.5120182037353516,
            "b": 0.4454752504825592,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 12,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "4104:3680",
    "name": "other/badges/heads-up/with-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 35,
      "height": 21,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 0.6745098233222961,
            "b": 0.22745098173618317,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 12,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "4104:3676",
    "name": "other/badges/success/with-number",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 35,
      "height": 21,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.15726026892662048,
            "g": 0.7457823753356934,
            "b": 0.536372184753418,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 12,
      "paddingLeft": 8,
      "paddingRight": 8,
      "paddingTop": 4,
      "paddingBottom": 4
    }
  },
  {
    "id": "4107:2497",
    "name": "stepper/old/horizontal",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 215,
      "height": 285,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4107:2705",
    "name": "stepper/old/vertical",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 144,
      "height": 428,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4103:2735",
    "name": "other/loading-bar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 504,
      "height": 18,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4107:3428",
    "name": "cards/empty-state-medium",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 504,
      "height": 335,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4523:5128",
    "name": "icons/line-chart ",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4122:4814",
    "name": "navigation/sss-admin/side-menu-expanded",
    "type": "COMPONENT",
    "variants": [
      "other/divider",
      "logos/manex-ar-omega",
      "logos/sss-en-multi-color",
      "navigation/side-menu-item",
      "navigation/side-menu-item",
      "navigation/side-menu-item copy 4",
      "navigation/side-menu-item copy 10",
      "navigation/side-menu-item copy",
      "navigation/side-menu-item copy 2",
      "navigation/side-menu-item copy 11",
      "navigation/side-menu-item copy 3",
      "navigation/side-menu-item"
    ],
    "properties": {
      "width": 262,
      "height": 720,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4174:18216",
    "name": "navigation/grid-tab-type-1-active",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 60,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 18,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "4174:18244",
    "name": "navigation/grid-tab-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 60,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4174:18215",
    "name": "navigation/grid-tab-type-1-inactive",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 60,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4148:6748",
    "name": "navigation/alert-type-1",
    "type": "COMPONENT",
    "variants": [
      "buttons/text/legend-with-right-icon"
    ],
    "properties": {
      "width": 1032,
      "height": 66,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.7882353067398071,
            "g": 0.7960784435272217,
            "b": 0.8352941274642944,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.11349978297948837
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": true
        }
      ],
      "cornerRadius": 8,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "4149:6594",
    "name": "cards/asset-stats-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 99,
      "fills": [],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ]
    }
  },
  {
    "id": "4157:13360",
    "name": "icons/overflow-menu-vertical",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4167:12589",
    "name": "lists/asset-alert-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 1032,
      "height": 87,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4176:20354",
    "name": "lists/ou-sub-tree-with-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 370,
      "height": 34,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4186:19858",
    "name": "cards/main-money-to-ou",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 402,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4186:24786",
    "name": "cards/sub-money-to-ou-type-3",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 315,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4186:21164",
    "name": "cards/sub-money-to-ou-details",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 450,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4240:37660",
    "name": "icons/infinity",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4214:28290",
    "name": "cards/asset-stats-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 504,
      "height": 96,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": false,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.11349978297948837
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": true
        }
      ]
    }
  },
  {
    "id": "4237:35228",
    "name": "icons/photo",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4237:35252",
    "name": "cards/upload-or-attach",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 143,
      "height": 82,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.6117647290229797,
            "g": 0.6274510025978088,
            "b": 0.6901960968971252,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 8,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 34,
      "paddingBottom": 34
    }
  },
  {
    "id": "4237:35336",
    "name": "icons/lock",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4238:40982",
    "name": "navigation/tags/info-type-5",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 136,
      "height": 37,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4244:42313",
    "name": "inputs/inactive/tag-selection",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 63,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4143:5053",
    "name": "zarchive/navigation/corporate/page-header-section",
    "type": "COMPONENT",
    "variants": [
      "dropdowns/section-expand-with-icon",
      "other/divider"
    ],
    "properties": {
      "width": 1032,
      "height": 89,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4147:3817",
    "name": "zarchive/navigation/page-footer-section",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-ar-multi-color"
    ],
    "properties": {
      "width": 1032,
      "height": 67,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4281:41842",
    "name": "mobile/navigation/tab-bar",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 400,
      "height": 184,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4290:19936",
    "name": "icons/empty-file",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4290:19933",
    "name": "mobile/cards/offer",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 127,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4290:3667",
    "name": "mobile/lists/service",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 74,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4290:3629",
    "name": "mobile/cards/corporate",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 134,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4287:3605",
    "name": "mobile/cards/transaction",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 289,
      "height": 100,
      "fills": [],
      "strokes": [],
      "effects": [],
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "4287:3467",
    "name": "mobile/cards/language",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 214,
      "height": 68,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4281:42311",
    "name": "mobile/navigation/header",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 352,
      "height": 136,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4281:42424",
    "name": "mobile/navigation/sub-header",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 127,
      "height": 136,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4281:42473",
    "name": "mobile/inputs",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 284,
      "height": 332,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4282:42537",
    "name": "logos/manex-gauge-icon",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 140,
      "height": 260,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4282:42554",
    "name": "mobile/other/snackbar",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 372,
      "height": 196,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4282:42574",
    "name": "mobile/other/app-icon",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 66,
      "height": 71,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4282:42610",
    "name": "mobile/lists/corporate",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 352,
      "height": 157,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4287:3397",
    "name": "manex-gague-text",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 106,
      "height": 100,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4290:3608",
    "name": "icons/clock",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4302:2825",
    "name": "mobile/other/cover",
    "type": "COMPONENT",
    "variants": [
      "icons/gauge"
    ],
    "properties": {
      "width": 360,
      "height": 640,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.022592950612306595,
            "g": 0.0278329961001873,
            "b": 0.13525390625,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4305:3407",
    "name": "icons/phone",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4307:3412",
    "name": "other/OTP",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 244,
      "height": 43,
      "fills": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4308:3419",
    "name": "icons/resend",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4324:3977",
    "name": "icons/logout-ar",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4336:43033",
    "name": "icons/login",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4340:6899",
    "name": "tooltips/arrow-down/default-no-icon",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 124,
      "height": 170,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4348:2804",
    "name": "icons/account-suspended",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4355:3033",
    "name": "mobile/cards/details",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 65,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4361:2844",
    "name": "icons/location-off",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4367:38764",
    "name": "icons/tasks",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4369:4508",
    "name": "icons/routine",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4382:3194",
    "name": "icons/image",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4382:3214",
    "name": "mobile/cards/upload-photo",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 150,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4388:11659",
    "name": "icons/quick-actions",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4397:2855",
    "name": "icons/password-lock",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4422:2963",
    "name": "icons/plus",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4441:2992",
    "name": "mobile/cards/policy",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 174,
      "height": 482,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4446:2936",
    "name": "mobile/cards/daily-transaction",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 45,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4469:2922",
    "name": "icons/history",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4476:23023",
    "name": "icons/minus",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4478:28625",
    "name": "icons/vehicle-placeholder",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4487:2927",
    "name": "icons/user-placeholder",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4478:28643",
    "name": "icons/my-location",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4498:2952",
    "name": "icons/offers",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4499:21150",
    "name": "icons/warehouse",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4503:3475",
    "name": "icons/money-bill",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4186:20510",
    "name": "cards/sub-money-to-ou-type-1",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 391,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4186:21297",
    "name": "cards/sub-money-to-ou-type-2",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 328,
      "height": 361,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4528:5311",
    "name": "cards/transactions",
    "type": "COMPONENT",
    "variants": [
      "dropdowns/selection-no-label-inactive",
      "dropdowns/selection-no-label-inactive",
      "dropdowns/selection-no-label-inactive",
      "dropdowns/selection-no-label-inactive"
    ],
    "properties": {
      "width": 1032,
      "height": 152,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4548:4148",
    "name": "tables/cell",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 141,
      "height": 340,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4610:4896",
    "name": "inputs/inactive/type-1-no-icon",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 280,
      "height": 186,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4615:5024",
    "name": "icons/pdf",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4615:5045",
    "name": "icons/excel",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4691:3006",
    "name": "other/empty-state",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 144,
      "height": 588,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4783:3015",
    "name": "icons/power",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4829:3273",
    "name": "other/html-header-section",
    "type": "COMPONENT",
    "variants": [
      "logos/manex-multi-langauge"
    ],
    "properties": {
      "width": 500,
      "height": 107,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.9647058844566345,
            "g": 0.9686274528503418,
            "b": 0.9764705896377563,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4829:3275",
    "name": "other/html-footer-section",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 540,
      "height": 574,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4829:4147",
    "name": "other/download-app",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 132,
      "height": 114,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4892:3432",
    "name": "icons/auto-action",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4930:3485",
    "name": "cards/product-info",
    "type": "COMPONENT",
    "variants": [
      "buttons/overflow-menu"
    ],
    "properties": {
      "width": 240,
      "height": 295,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4952:3452",
    "name": "icons/camera-switch",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4955:3504",
    "name": "icons/flash",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 228,
      "height": 64,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "4967:3505",
    "name": "icons/nfc",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4981:3449",
    "name": "icons/qr-code",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "4998:4726",
    "name": "icons/order",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5000:4941",
    "name": "icons/get-offer",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5058:3423",
    "name": "icons/delivery",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5126:3418",
    "name": "inputs/quantity",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 220,
      "height": 140,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5132:4029",
    "name": "icons/smartphone",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5144:3423",
    "name": "icons/new-user",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5159:3421",
    "name": "tables/state-cell",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 117,
      "height": 404,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5180:4066",
    "name": "icons/email",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5203:3508",
    "name": "stepper/desktop",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 178,
      "height": 523,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5280:3616",
    "name": "stepper/mobile",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 147,
      "height": 314,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5232:3445",
    "name": "mockups/android",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 514,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5265:3500",
    "name": "cards/info",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 1100,
      "height": 666,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5350:3459",
    "name": "tables/legends",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 424,
      "height": 92,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5361:3653",
    "name": "icons/pointer",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5368:3699",
    "name": "icons/download",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5375:3545",
    "name": "charts/pie-chart",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 1164,
      "height": 124,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5398:3515",
    "name": "mockups/laptop",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 926,
      "height": 2212,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5426:5462",
    "name": "icons/view",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 228,
      "height": 64,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5481:3490",
    "name": "other/toggle",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 196,
      "height": 78,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5500:3498",
    "name": "social-media/calendar/days",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 240,
      "height": 46,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5502:3692",
    "name": "social-media/calendar/row",
    "type": "COMPONENT",
    "variants": [
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell",
      "other/divider",
      "social-media/calendar/cell"
    ],
    "properties": {
      "width": 1830,
      "height": 346,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.1568627506494522,
            "g": 0.1921568661928177,
            "b": 0.3333333432674408,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 12,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "5504:3771",
    "name": "social-media/calendar/header-row",
    "type": "COMPONENT",
    "variants": [
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days",
      "other/divider",
      "social-media/calendar/days"
    ],
    "properties": {
      "width": 1830,
      "height": 94,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.1568627506494522,
            "g": 0.1921568661928177,
            "b": 0.3333333432674408,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [],
      "cornerRadius": 12,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "5504:3820",
    "name": "social-media/calendar/cell",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 544,
      "height": 396,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5507:3561",
    "name": "icons/instagram",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5507:3582",
    "name": "icons/youtube",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5507:3587",
    "name": "icons/twitter",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5532:3831",
    "name": "popups/standard-with-input",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 416,
      "height": 474,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.5920000076293945,
            "g": 0.5920000076293945,
            "b": 0.5920000076293945,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.23999999463558197
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 44,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 24,
      "paddingLeft": 34,
      "paddingRight": 34,
      "paddingTop": 34,
      "paddingBottom": 34
    }
  },
  {
    "id": "5540:4134",
    "name": "tables/header",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 225,
      "height": 156,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5544:3839",
    "name": "icons/figma",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 228,
      "height": 64,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5564:3786",
    "name": "icons/cloud-upload",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5644:4510",
    "name": "navigation/page-header-section-with-data",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 1100,
      "height": 542,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5802:4483",
    "name": "icons/car",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5820:4666",
    "name": "inputs/calendar",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 484,
      "height": 1498,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "5820:4965",
    "name": "icons/arrow-right-type-3",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5820:4970",
    "name": "icons/arrow-left-type-3",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5830:4574",
    "name": "icons/brake",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "5964:3871",
    "name": "icons/apps",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4427",
    "name": "icons/engine-belts",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4430",
    "name": "icons/electronics",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4411",
    "name": "icons/diesel",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4410",
    "name": "icons/natural-gas",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4428",
    "name": "icons/lodging",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4406",
    "name": "icons/gasoline-80",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4405",
    "name": "icons/gasoline-92",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4404",
    "name": "icons/gasoline-95",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4409",
    "name": "icons/e-charge-vehicle",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4408",
    "name": "icons/food-beverages",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4426",
    "name": "icons/stationary",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4425",
    "name": "icons/vehicles-maintenance",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4424",
    "name": "icons/vehicles-periodic-maintenance",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4423",
    "name": "icons/vehicles-spare-parts",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4431",
    "name": "icons/tools-and-hardware",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4434",
    "name": "icons/service-fees",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4422",
    "name": "icons/washing-and-lubrication",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4420",
    "name": "icons/nfc-cards",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4419",
    "name": "icons/garage",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4418",
    "name": "icons/toll",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4417",
    "name": "icons/transportation-fees",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4433",
    "name": "icons/cleaning-supplies",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4421",
    "name": "icons/tires",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4416",
    "name": "icons/car-batteries",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4415",
    "name": "icons/electrics",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4414",
    "name": "icons/cleaning-tools",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6114:4413",
    "name": "icons/motorcycles",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6140:3778",
    "name": "logos/manex-multi-langauge",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 334,
      "height": 408,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "6208:4303",
    "name": "icons/whatsapp",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6208:4306",
    "name": "icons/facebook",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 228,
      "height": 64,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "6208:4312",
    "name": "icons/linkedin",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 228,
      "height": 65,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "6841:3788",
    "name": "other/figma-cover",
    "type": "COMPONENT_SET",
    "variants": [],
    "properties": {
      "width": 1960,
      "height": 2220,
      "fills": [],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 0.5921568870544434,
            "g": 0.27843138575553894,
            "b": 1,
            "a": 1
          }
        }
      ],
      "effects": [],
      "cornerRadius": 5
    }
  },
  {
    "id": "6956:3849",
    "name": "mobile/cards/service",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 134,
      "height": 172,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6956:3896",
    "name": "icons/phone-bill",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "6956:3900",
    "name": "icons/water",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 64,
      "height": 64,
      "fills": [],
      "strokes": [],
      "effects": []
    }
  },
  {
    "id": "7161:3974",
    "name": "mobile/cards/order",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 370,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 14,
      "paddingLeft": 14,
      "paddingRight": 14,
      "paddingTop": 14,
      "paddingBottom": 14
    }
  },
  {
    "id": "7337:3901",
    "name": "mobile/cards/pin",
    "type": "COMPONENT",
    "variants": [
      "other/OTP",
      "buttons/filled/primary-with-right-icon"
    ],
    "properties": {
      "width": 292,
      "height": 217,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 24,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 24,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  },
  {
    "id": "7321:3880",
    "name": "mobile/popups",
    "type": "COMPONENT",
    "variants": [],
    "properties": {
      "width": 292,
      "height": 358,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [
        {
          "blendMode": "NORMAL",
          "visible": false,
          "type": "SOLID",
          "color": {
            "r": 0.5920000076293945,
            "g": 0.5920000076293945,
            "b": 0.5920000076293945,
            "a": 1
          }
        }
      ],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.23999999463558197
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 44,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 24,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 34,
      "paddingBottom": 34
    }
  },
  {
    "id": "7493:4014",
    "name": "mobile/navigation/page-header-section",
    "type": "COMPONENT",
    "variants": [
      "buttons/filled/primary-with-right-icon"
    ],
    "properties": {
      "width": 312,
      "height": 153,
      "fills": [
        {
          "blendMode": "NORMAL",
          "type": "SOLID",
          "color": {
            "r": 1,
            "g": 1,
            "b": 1,
            "a": 1
          }
        }
      ],
      "strokes": [],
      "effects": [
        {
          "type": "DROP_SHADOW",
          "visible": true,
          "color": {
            "r": 0,
            "g": 0,
            "b": 0,
            "a": 0.07999999821186066
          },
          "blendMode": "NORMAL",
          "offset": {
            "x": 0,
            "y": 4
          },
          "radius": 14,
          "showShadowBehindNode": false
        }
      ],
      "cornerRadius": 18,
      "paddingLeft": 24,
      "paddingRight": 24,
      "paddingTop": 24,
      "paddingBottom": 24
    }
  }
]
  };
}
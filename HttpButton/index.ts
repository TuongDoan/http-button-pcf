import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { Button } from "@fluentui/react-components";

export class HttpButton implements ComponentFramework.ReactControl<IInputs, IOutputs> {
  private context!: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged!: () => void;
  private responseStatus?: number;
  private responseBody?: string;
  


  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    _state: ComponentFramework.Dictionary
  ): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    // Track container resize for canvas apps
    context.mode.trackContainerResize(true);
    this.notifyOutputChanged();
      ;
    }
  

  private async sendRequest(): Promise<void> {
    const url = this.context.parameters.targetEndpoint.raw ?? "";
    const methodEnum = this.context.parameters.method.raw;

    const methodMap: Record<string, string> = {
      "0": "POST",
      "1": "GET",
      "2": "PUT",
      "3": "PATCH",
      "4": "DELETE",
    };
  const method = methodMap[methodEnum as keyof typeof methodMap] ?? "GET";
    let bodyString: string | undefined;

    if (method !== "GET") {
      // safer JSON parse with runtime checks
      const payloadRaw = this.context.parameters.payload.raw ?? "{}";
      let parsed: unknown;
      try {
        parsed = JSON.parse(payloadRaw);
      } catch {
        alert("Invalid JSON payload");
        this.responseStatus = undefined;
        this.responseBody = undefined;
        this.notifyOutputChanged();
        return;
      }

      if (typeof parsed !== "object" || parsed === null) {
        alert("Payload is not a JSON object");
        this.responseStatus = undefined;
        this.responseBody = undefined;
        this.notifyOutputChanged();
        return;}

      const bodyObj = parsed as Record<string, unknown>;
      bodyString = JSON.stringify(bodyObj);
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: bodyString,
      });
      this.responseStatus = response.status;
      this.responseBody = await response.text().catch(() => "");
      
    } catch (err: unknown) {
      this.responseStatus = undefined;
      this.responseBody = err instanceof Error ? err.message : String(err);
    }
    this.notifyOutputChanged();
  }


  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    this.context = context;
    const allocatedWidth = context.mode.allocatedWidth ?? 96;
    const allocatedHeight = context.mode.allocatedHeight ?? 32;
    const isDisabled = context.mode.isControlDisabled;
    // Font styles
    const fontFamily = context.parameters.FontName.raw ?? "Segoe UI";
    const fontSize = context.parameters.FontSize.raw
        ? `${context.parameters.FontSize.raw}px`
        : "10.5px";
    const fontWeight = context.parameters.FontWeight.raw ?? "normal";
    const fontColor = isDisabled
        ? context.parameters.DisabledFontColor.raw ?? "#888"
        : undefined 
        // context.parameters.FontColor.raw || "#222";

    // Fill styles
    const backgroundColor = isDisabled
        ? context.parameters.DisabledFillColor.raw ?? "#f3f3f3"
        : undefined;

    // Border styles
    const borderColor = context.parameters.BorderColor.raw ?? "transparent";
    const borderThickness = context.parameters.BorderThickness.raw
        ? `${context.parameters.BorderThickness.raw}px`
        : "0px";
    const borderRadius = context.parameters.BorderRadius.raw
        ? `${context.parameters.BorderRadius.raw}px`
        : undefined;
    return React.createElement(
      Button,
      {
        appearance: "primary",
        style: {
          width: `${allocatedWidth}px`,
          height: `${allocatedHeight}px`,
        fontFamily,
        fontSize,
        fontWeight,
        color: fontColor,
        backgroundColor,
        borderColor,
        borderWidth: borderThickness,
        borderRadius,
        borderStyle: borderThickness !== "0px" ? "solid" : undefined,
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
        },
        
        onClick: isDisabled ? undefined : () => {void this.sendRequest(); },
      },
      this.context.parameters.buttonText.raw ?? "Send Request"
    );
  }


  public getOutputs(): IOutputs {
    return {
      Responses: JSON.stringify({
        statusCode: this.responseStatus,
        body: this.responseBody,
      }),
    };
  }

  public destroy(): void {
    // cleanup if needed
  }
}

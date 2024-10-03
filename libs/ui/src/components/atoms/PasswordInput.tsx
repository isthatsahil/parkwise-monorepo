import React from "react";
import { Input, InputProps } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const PasswordInput = (
  props: React.JSX.IntrinsicAttributes &
    InputProps &
    React.RefAttributes<HTMLInputElement>
) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled = undefined;
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("hide-password-toggle pr-10")}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
};

export default PasswordInput;

import { CircularProgress, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setInputs } from "../../utility/inputsSlice";
import { IoMdSend } from "react-icons/io";
import { generateKeywords, validateUrl } from "../../api/optimization";

function UserInput({ onFormValid }) {
    const [websiteUrl, setWebsiteUrl] = useState('');    
    const [primaryKeywords, setPrimaryKeywords] = useState('');
    const [secondaryKeywords, setSecondaryKeywords] = useState('');
    const [errors, setErrors] = useState({
        websiteUrl: false,
        primaryKeywordsCount: false,
        secondaryKeywordsCount: false,
    });
    const [loading, setLoading] = useState(false); // Loading state

    const dispatch = useDispatch();
   
    const handleButtonClick = async () => {
        let url = websiteUrl.trim();
        let primaryKeys = primaryKeywords.trim();
        let secondaryKeys = secondaryKeywords.trim();

        // Dispatch null values first
        dispatch(setInputs({ url: null, primaryKeywords: null, secondaryKeywords: null }));       


        let formValid = true;
        if (!url) {
            setErrors(prevErrors => ({ ...prevErrors, websiteUrl: true }));
            formValid = false;
        } else {
            // Check and prepend https:// if missing
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `https://${url}`;
            }
            const isValidUrl = await validateUrl(url);
            if (!isValidUrl) {
                setErrors(prevErrors => ({ ...prevErrors, websiteUrl: true }));
                formValid = false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, websiteUrl: false }));
            }
        }

        if (formValid && (primaryKeys === '' || secondaryKeys === '')) {
            setLoading(true); // Set loading state to true
            try {
                const response = await generateKeywords(url);
                if (primaryKeys === '') {
                    primaryKeys = response.primary;
                    setPrimaryKeywords(primaryKeys);
                }
                if (secondaryKeys === '') {
                    secondaryKeys = response.secondary;
                    setSecondaryKeywords(secondaryKeys);
                }
            } catch (error) {
                console.error('Error generating keywords:', error);
                formValid = false;
            }
            setLoading(false); // Set loading state to false
        }

        const countKeywords = (keywordsString) => {
            const keywords = keywordsString.split(',').map(key => key.trim()).filter(key => key !== '');
            return keywords.length;
        };

        if (primaryKeys === '') {
            setErrors(prevErrors => ({ ...prevErrors, primaryKeywordsCount: true }));
            formValid = false;
        } else {
            const count = countKeywords(primaryKeys);
            if (count > 2) {
                setErrors(prevErrors => ({ ...prevErrors, primaryKeywordsCount: true }));
                formValid = false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, primaryKeywordsCount: false }));
            }
        }

        if (secondaryKeys === '') {
            setErrors(prevErrors => ({ ...prevErrors, secondaryKeywordsCount: true }));
            formValid = false;
        } else {
            const count = countKeywords(secondaryKeys);
            if (count > 5) {
                setErrors(prevErrors => ({ ...prevErrors, secondaryKeywordsCount: true }));
                formValid = false;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, secondaryKeywordsCount: false }));
            }
        }        

        if(formValid) {
            dispatch(setInputs({ url, primaryKeywords: primaryKeys, secondaryKeywords: secondaryKeys }));
            onFormValid(true);
        }
    }

    return (
        <div className='w-full flex flex-col items-center justify-center h-full gap-6'>
            <h1 className="text-3xl text-center w-3/4 font-bold flex justify-center items-center gap-3 font-sans tracking-wide">
                <BsFillRocketTakeoffFill className='text-brandPrimary text-[45px]' /> Supercharge Your Website Content
            </h1>
            <h2 className="text-lg text-center font-sans tracking-wide">
                Transform Your Content for Maximum Impact and Engagement
            </h2>
            <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-4 mt-3">
                <div className="w-full flex items-center mb-6">
                    <TextField
                        id={errors.websiteUrl ? "outlined-error-helper-text" : "outlined-basic"}
                        label={errors.websiteUrl ? "Error" : "Enter website URL"}
                        variant="outlined"
                        fullWidth
                        error={errors.websiteUrl}
                        helperText={errors.websiteUrl ? "Please enter a valid website URL" : ""}
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="h-[50px]"
                        InputProps={{
                            style: {
                                borderRadius: "15px",
                            },
                            endAdornment: (
                                <div className="flex items-center pr-2">
                                    <FaSearch className="text-[20px] text-gray-500" />
                                </div>
                            ),
                        }}
                    />
                </div>
                <div className='w-full flex flex-col sm:flex-row gap-4 mb-3'>
                    <div className='flex-1'>
                        <TextField
                            id={errors.primaryKeywordsCount ? "outlined-error-helper-text" : "outlined-basic"}
                            label={errors.primaryKeywordsCount ? "Error" : "Primary Keywords (Optional)"}
                            variant="outlined"
                            fullWidth
                            className="h-[50px]"
                            helperText={errors.primaryKeywordsCount ? "Maximum 2 Primary Keywords." : ""}
                            error={errors.primaryKeywordsCount}
                            value={primaryKeywords}
                            onChange={(e) => setPrimaryKeywords(e.target.value)}
                            placeholder="keyword1, keyword2"
                            multiline
                            InputProps={{
                                style: {
                                    borderRadius: "15px",
                                }
                            }}
                        />
                    </div>
                    <div className='flex-1'>
                        <TextField
                            id={errors.secondaryKeywordsCount ? "outlined-error-helper-text" : "outlined-basic"}
                            label={errors.secondaryKeywordsCount ? "Error" : "Secondary Keywords (Optional)"}
                            variant="outlined"
                            fullWidth
                            className="h-[50px]"
                            helperText={errors.secondaryKeywordsCount ? "Maximum 5 Secondary Keywords." : ""}
                            error={errors.secondaryKeywordsCount}
                            value={secondaryKeywords}
                            onChange={(e) => setSecondaryKeywords(e.target.value)}
                            placeholder="keyword1, keyword2, keyword3, ...."
                            multiline
                            InputProps={{
                                style: {
                                    borderRadius: "15px",
                                }
                            }}
                        />
                    </div>                
                </div>
                <div className="w-full flex justify-start items-center gap-2 mt-3 mb-3">
                    <button 
                        type="button" 
                        className="flex justify-center items-center gap-2 text-white bg-brandPrimary px-4 py-2 transition duration-300 rounded-lg hover:bg-neutralDGrey focus:ring-4 focus:outline-none focus:ring-green-300 shadow-green-500/50 font-medium text-md text-center"
                        onClick={handleButtonClick}
                    >
                        Optimize Now <IoMdSend/> 
                    </button>
                    {loading && <CircularProgress size={30} />} {/* Loading text */}
                </div>
            </div>
        </div>
    );
    
}

export default UserInput;

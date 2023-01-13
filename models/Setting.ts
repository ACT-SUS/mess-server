import { model, Schema } from 'mongoose'

const settingSchema = new Schema({
    menu: {
        Monday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Tuesday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Wednesday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Thursday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Friday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Saturday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
        Sunday: {
            breakfast: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            lunch: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
            dinner: {
                type: {
                    type: String,
                    required: true,
                },
                dish: {
                    type: String,
                    required: true,
                }
            },
        },
    },
    price: {
        breakfast: {
            type: Number,
            required: true,
        },
        vegMeal: {
            type: Number,
            required: true,
        },
        nonVegMeal: {
            type: Number,
            required: true,
        },
    },
    semCycle: {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        }
    },
})

const Setting = model('setting', settingSchema)
export default Setting
